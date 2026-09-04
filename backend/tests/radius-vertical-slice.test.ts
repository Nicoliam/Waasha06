/**
 * Radius Vertical Slice — Backend Tests
 * Covers PHASE 7 requirements (15 cases). Uses supertest without DB where practical
 * by mocking Prisma, then integration cases against real geo logic.
 * Run with: npm test -- radius-vertical-slice
 */

import request from 'supertest';
import jwt from 'jsonwebtoken';

// Mock Prisma before importing app
const mockAdminSettingFindMany = jest.fn();
const mockProviderProfileFindUnique = jest.fn();
const mockProviderProfileUpdate = jest.fn();
const mockProviderLocationFindMany = jest.fn();
const mockServiceCategoryFindUnique = jest.fn();
const mockServiceFindFirst = jest.fn();
const mockAuditCreate = jest.fn();
const mockUserFindUnique = jest.fn();

jest.mock('../src/config/prisma', () => ({
  prisma: {
    user: { findUnique: mockUserFindUnique },
    adminSetting: { findMany: mockAdminSettingFindMany },
    providerProfile: {
      findUnique: mockProviderProfileFindUnique,
      update: mockProviderProfileUpdate,
    },
    providerLocation: { findMany: mockProviderLocationFindMany },
    serviceCategory: { findUnique: mockServiceCategoryFindUnique },
    service: { findFirst: mockServiceFindFirst },
    auditLog: { create: mockAuditCreate },
    $queryRaw: jest.fn().mockResolvedValue([1]),
  },
}));

import { app } from '../src/app';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-jwt-secret-change-me';

function token(payload: { sub: string; providerId?: string }) {
  return jwt.sign(
    { uuid: payload.sub, email: `${payload.sub}@test.local`, roles: ['PROVIDER'], ...payload },
    JWT_SECRET,
    { expiresIn: '1h', issuer: 'waasha', audience: 'waasha-app' } as any,
  );
}

const DEFAULT_ADMIN_ROWS = [
  { settingKey: 'default_discovery_radius_km', settingValue: '10' },
  { settingKey: 'max_discovery_radius_km', settingValue: '20' },
  { settingKey: 'allowed_customer_radii_km', settingValue: JSON.stringify([10, 15, 20]) },
  { settingKey: 'allowed_provider_coverages_km', settingValue: JSON.stringify([10, 15, 20]) },
  { settingKey: 'max_provider_coverage_km', settingValue: '20' },
];

beforeEach(() => {
  jest.clearAllMocks();
  mockAdminSettingFindMany.mockResolvedValue(DEFAULT_ADMIN_ROWS);
  mockServiceCategoryFindUnique.mockResolvedValue(null);
  mockServiceFindFirst.mockResolvedValue(null);
  mockAuditCreate.mockResolvedValue({});
  // Auth middleware requires user to exist and be ACTIVE — default to ACTIVE for any user id used in tokens
  mockUserFindUnique.mockImplementation(async ({ where }: any) => {
    if (where?.id && typeof where.id === 'string' && where.id.startsWith('user')) {
      return { id: where.id, status: 'ACTIVE', uuid: where.id, email: `${where.id}@test.local` };
    }
    return null;
  });
});

// Helper: create provider locations at distance ~kms north of center (-26.2041, 28.0473)
// 1 deg lat ≈ 111km, so offset = km/111
function locAtKm(providerId: string, km: number, coverage: number) {
  const center = { latitude: -26.2041, longitude: 28.0473 };
  const lat = center.latitude + km / 111.0;
  return {
    id: `loc-${providerId}`,
    providerId,
    latitude: lat,
    longitude: center.longitude,
    isActive: true,
    provider: { id: providerId, displayName: `Provider ${providerId}`, coverageRadiusKm: coverage, status: 'ACTIVE', tierId: 'T1' },
  };
}

describe('GET /api/v1/marketplace/config', () => {
  it('1. default radius = 10', async () => {
    const res = await request(app).get('/api/v1/marketplace/config');
    expect(res.status).toBe(200);
    expect(res.body.data.default_discovery_radius_km).toBe(10);
  });

  it('returns allowed radii 10,15,20 and max 20', async () => {
    const res = await request(app).get('/api/v1/marketplace/config');
    expect(res.body.data.allowed_customer_radii_km).toEqual([10, 15, 20]);
    expect(res.body.data.max_discovery_radius_km).toBe(20);
    expect(res.body.data.allowed_provider_coverages_km).toEqual([10, 15, 20]);
    expect(res.body.data.max_provider_coverage_km).toBe(20);
  });
});

describe('GET /api/v1/marketplace/providers — validation', () => {
  it('2. customer expansion 10 → 15 → 20 accepted', async () => {
    mockProviderLocationFindMany.mockResolvedValue([]);
    for (const r of [10, 15, 20]) {
      const res = await request(app).get('/api/v1/marketplace/providers').query({ latitude: -26.2041, longitude: 28.0473, radiusKm: r });
      expect(res.status).toBe(200);
      expect(res.body.meta.radiusKm).toBe(r);
    }
  });

  it('3. radius above 20 rejected', async () => {
    const res = await request(app).get('/api/v1/marketplace/providers').query({ latitude: -26.2041, longitude: 28.0473, radiusKm: 25 });
    expect(res.status).toBe(422);
    expect(res.body.error.code).toMatch(/INVALID_RADIUS|RADIUS_EXCEEDS_MAX/);
  });

  it('4. invalid radius (12, not in allowed set) rejected', async () => {
    const res = await request(app).get('/api/v1/marketplace/providers').query({ latitude: -26.2041, longitude: 28.0473, radiusKm: 12 });
    expect(res.status).toBe(422);
    expect(res.body.error.code).toBe('INVALID_RADIUS');
  });
});

describe('PUT /api/v1/providers/me/coverage — validation', () => {
  const tok = token({ sub: 'user-1', providerId: 'prov-1' });

  it('5. provider coverage 10 accepted', async () => {
    mockProviderProfileFindUnique.mockResolvedValue({ id: 'prov-1', userId: 'user-1', coverageRadiusKm: 10 });
    mockProviderProfileUpdate.mockResolvedValue({ coverageRadiusKm: 10, updatedAt: new Date() });
    const res = await request(app)
      .put('/api/v1/providers/me/coverage')
      .set('Authorization', `Bearer ${tok}`)
      .send({ coverageRadiusKm: 10 });
    expect(res.status).toBe(200);
    expect(res.body.data.coverageRadiusKm).toBe(10);
  });

  it('6. provider coverage 15 accepted', async () => {
    mockProviderProfileFindUnique.mockResolvedValue({ id: 'prov-1', userId: 'user-1', coverageRadiusKm: 10 });
    mockProviderProfileUpdate.mockResolvedValue({ coverageRadiusKm: 15, updatedAt: new Date() });
    const res = await request(app)
      .put('/api/v1/providers/me/coverage')
      .set('Authorization', `Bearer ${tok}`)
      .send({ coverageRadiusKm: 15 });
    expect(res.status).toBe(200);
    expect(res.body.data.coverageRadiusKm).toBe(15);
  });

  it('7. provider coverage 20 accepted', async () => {
    mockProviderProfileFindUnique.mockResolvedValue({ id: 'prov-1', userId: 'user-1', coverageRadiusKm: 15 });
    mockProviderProfileUpdate.mockResolvedValue({ coverageRadiusKm: 20, updatedAt: new Date() });
    const res = await request(app)
      .put('/api/v1/providers/me/coverage')
      .set('Authorization', `Bearer ${tok}`)
      .send({ coverageRadiusKm: 20 });
    expect(res.status).toBe(200);
    expect(res.body.data.coverageRadiusKm).toBe(20);
  });

  it('8. provider coverage above 20 rejected', async () => {
    mockProviderProfileFindUnique.mockResolvedValue({ id: 'prov-1', userId: 'user-1' });
    const res = await request(app)
      .put('/api/v1/providers/me/coverage')
      .set('Authorization', `Bearer ${tok}`)
      .send({ coverageRadiusKm: 25 });
    expect(res.status).toBe(422);
  });

  it('9. provider coverage below minimum (5) rejected', async () => {
    const res = await request(app)
      .put('/api/v1/providers/me/coverage')
      .set('Authorization', `Bearer ${tok}`)
      .send({ coverageRadiusKm: 5 });
    expect(res.status).toBe(422);
  });

  it('14. unauthorized cannot change another provider coverage (tenant isolation)', async () => {
    // user-1 owns prov-1; attacker with prov-attacker can only modify own
    const attackerTok = token({ sub: 'user-attacker', providerId: 'prov-attacker' });
    mockProviderProfileFindUnique.mockResolvedValueOnce({ id: 'prov-attacker', userId: 'user-attacker', coverageRadiusKm: 10 });
    mockProviderProfileFindUnique.mockResolvedValueOnce({ id: 'prov-attacker', userId: 'user-attacker', coverageRadiusKm: 10 });
    mockProviderProfileUpdate.mockResolvedValue({ coverageRadiusKm: 15, updatedAt: new Date() });
    const res = await request(app)
      .put('/api/v1/providers/me/coverage')
      .set('Authorization', `Bearer ${attackerTok}`)
      .send({ coverageRadiusKm: 15 });
    expect(res.status).toBe(200);
    const updateCall = mockProviderProfileUpdate.mock.calls[0][0];
    expect(updateCall.where.id).toBe('prov-attacker');
    expect(updateCall.where.id).not.toBe('prov-1');
  });

  it('15. tenant isolation: no auth → 401', async () => {
    const res = await request(app).put('/api/v1/providers/me/coverage').send({ coverageRadiusKm: 10 });
    expect(res.status).toBe(401);
  });
});

describe('GET /api/v1/marketplace/providers — BOTH rule', () => {
  it('10. 12km provider with 10km coverage excluded at customer radius 15', async () => {
    mockProviderLocationFindMany.mockResolvedValue([locAtKm('p10', 12, 10)]);
    const res = await request(app).get('/api/v1/marketplace/providers').query({ latitude: -26.2041, longitude: 28.0473, radiusKm: 15 });
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(0);
  });

  it('11. 12km provider with 15km coverage included at customer radius 15', async () => {
    mockProviderLocationFindMany.mockResolvedValue([locAtKm('p15', 12, 15)]);
    const res = await request(app).get('/api/v1/marketplace/providers').query({ latitude: -26.2041, longitude: 28.0473, radiusKm: 15 });
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].id).toBe('p15');
  });

  it('12. 18km provider with 20km coverage included at customer radius 20', async () => {
    mockProviderLocationFindMany.mockResolvedValue([locAtKm('p20', 18, 20)]);
    const res = await request(app).get('/api/v1/marketplace/providers').query({ latitude: -26.2041, longitude: 28.0473, radiusKm: 20 });
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
  });

  it('13. 21km provider excluded even at radius 20', async () => {
    mockProviderLocationFindMany.mockResolvedValue([locAtKm('p21', 21, 20)]);
    const res = await request(app).get('/api/v1/marketplace/providers').query({ latitude: -26.2041, longitude: 28.0473, radiusKm: 20 });
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(0);
  });

  it('BOTH rule — provider beyond own coverage excluded even if close to max customer radius', async () => {
    mockProviderLocationFindMany.mockResolvedValue([locAtKm('p19-15', 19, 15)]);
    const res = await request(app).get('/api/v1/marketplace/providers').query({ latitude: -26.2041, longitude: 28.0473, radiusKm: 20 });
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(0);
  });
});

describe('GET /api/v1/providers/me/coverage — auth', () => {
  it('requires auth', async () => {
    const res = await request(app).get('/api/v1/providers/me/coverage');
    expect(res.status).toBe(401);
  });

  it('returns coverage for own profile', async () => {
    const tok = token({ sub: 'user-1', providerId: 'prov-1' });
    mockProviderProfileFindUnique.mockResolvedValue({ id: 'prov-1', coverageRadiusKm: 15 });
    const res = await request(app).get('/api/v1/providers/me/coverage').set('Authorization', `Bearer ${tok}`);
    expect(res.status).toBe(200);
    expect(res.body.data.coverageRadiusKm).toBe(15);
  });
});
