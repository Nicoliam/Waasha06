/**
 * Discovery Phase 1 — additional coverage
 * Tests: config, categories, provider profile, service image limit, empty/error, category filtering, distance formatting
 */
import request from 'supertest';

const mockAdminSettingFindMany = jest.fn();
const mockServiceCategoryFindMany = jest.fn();
const mockServiceCategoryFindUnique = jest.fn();
const mockProviderProfileFindUnique = jest.fn();
const mockProviderLocationFindFirst = jest.fn();
const mockProviderLocationFindMany = jest.fn();
const mockServiceFindMany = jest.fn();
const mockServiceFindFirst = jest.fn();
const mockReviewAggregate = jest.fn();
const mockReviewFindMany = jest.fn();
const mockReviewGroupBy = jest.fn();
const mockAvailabilityFindFirst = jest.fn();
const mockUserFindUnique = jest.fn();

jest.mock('../src/config/prisma', () => ({
  prisma: {
    adminSetting: { findMany: mockAdminSettingFindMany },
    serviceCategory: { findMany: mockServiceCategoryFindMany, findUnique: mockServiceCategoryFindUnique },
    providerProfile: { findUnique: mockProviderProfileFindUnique },
    providerLocation: { findMany: mockProviderLocationFindMany, findFirst: mockProviderLocationFindFirst },
    service: { findMany: mockServiceFindMany, findFirst: mockServiceFindFirst },
    review: { aggregate: mockReviewAggregate, findMany: mockReviewFindMany, groupBy: mockReviewGroupBy },
    availabilityRule: { findFirst: mockAvailabilityFindFirst },
    user: { findUnique: mockUserFindUnique },
    $queryRaw: jest.fn().mockResolvedValue([1]),
    auditLog: { create: jest.fn().mockResolvedValue({}) },
  },
}));

import { app } from '../src/app';

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
  mockServiceCategoryFindMany.mockResolvedValue([
    { id: 'c1', code: 'BARBERS', name: 'Barbers', sortOrder: 1 },
    { id: 'c2', code: 'HAIR_SALONS_STYLISTS', name: 'Hair Salons & Stylists', sortOrder: 2 },
    { id: 'c3', code: 'NAIL_TECHNICIANS', name: 'Nail Technicians', sortOrder: 3 },
    { id: 'c4', code: 'BEAUTY_SERVICES', name: 'Beauty Services', sortOrder: 4 },
    { id: 'c5', code: 'CAR_WASH', name: 'Car Wash', sortOrder: 5 },
  ]);
  mockProviderLocationFindMany.mockResolvedValue([]);
  mockServiceFindFirst.mockResolvedValue(null);
  mockServiceFindMany.mockResolvedValue([]);
  mockReviewAggregate.mockResolvedValue({ _avg: { rating: null }, _count: { rating: 0 } });
  mockReviewGroupBy.mockResolvedValue([]);
  mockReviewFindMany.mockResolvedValue([]);
  mockAvailabilityFindFirst.mockResolvedValue(null);
  mockUserFindUnique.mockResolvedValue(null);
});

describe('Phase 1 — marketplace categories', () => {
  it('returns exactly 5 categories', async () => {
    const res = await request(app).get('/api/v1/marketplace/categories');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(5);
    expect(res.body.data.map((c: any) => c.code)).toEqual(['BARBERS', 'HAIR_SALONS_STYLISTS', 'NAIL_TECHNICIANS', 'BEAUTY_SERVICES', 'CAR_WASH']);
  });

  it('config default is 10 and allowed radii are 10,15,20 max 20', async () => {
    const res = await request(app).get('/api/v1/marketplace/config');
    expect(res.status).toBe(200);
    expect(res.body.data.default_discovery_radius_km).toBe(10);
    expect(res.body.data.allowed_customer_radii_km).toEqual([10, 15, 20]);
    expect(res.body.data.max_discovery_radius_km).toBe(20);
    expect(res.body.data.max_provider_coverage_km).toBe(20);
  });
});

describe('Phase 1 — provider profile', () => {
  it('loads provider profile with services (real data, no fake catalog) and respects max 3 images per service', async () => {
    const provider = {
      id: 'prov-1',
      displayName: 'Test Provider',
      bio: 'Bio text',
      profileImageUrl: null,
      experienceSummary: null,
      tier: { code: 'T1', name: 'Individual' },
      verificationStatus: 'VERIFIED',
      status: 'ACTIVE',
      coverageRadiusKm: 10,
      customRequestsEnabled: false,
    };
    mockProviderProfileFindUnique.mockResolvedValue(provider as any);
    mockProviderLocationFindFirst.mockResolvedValue({
      city: 'Sandton',
      province: 'Gauteng',
      latitude: -26.2041,
      longitude: 28.0473,
      isPrimary: true,
    } as any);
    mockServiceFindMany.mockResolvedValue([
      {
        id: 'svc-1',
        uuid: 'uuid-1',
        name: 'Fade',
        description: 'Desc',
        price: 180 as any,
        currency: 'ZAR',
        durationMinutes: 45,
        serviceMode: 'BOTH',
        status: 'ACTIVE',
        category: { id: 'c1', code: 'BARBERS', name: 'Barbers' },
        images: [
          { id: 'i1', imageUrl: 'https://example.com/1.jpg', sortOrder: 0 },
          { id: 'i2', imageUrl: 'https://example.com/2.jpg', sortOrder: 1 },
          { id: 'i3', imageUrl: 'https://example.com/3.jpg', sortOrder: 2 },
          { id: 'i4', imageUrl: 'https://example.com/4.jpg', sortOrder: 3 },
        ],
      },
    ] as any);
    // ensure only 3 images returned
    mockReviewAggregate.mockResolvedValue({ _avg: { rating: 4.8 }, _count: { rating: 10 } } as any);
    mockReviewFindMany.mockResolvedValue([]);

    const res = await request(app).get('/api/v1/marketplace/providers/prov-1').query({ latitude: -26.2041, longitude: 28.0473 });
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe('prov-1');
    expect(res.body.data.tier.code).toBe('T1');
    expect(res.body.data.services).toHaveLength(1);
    expect(res.body.data.services[0].images).toHaveLength(3); // max 3 enforced
    expect(res.body.data.rating).toBe(4.8);
    expect(res.body.data.reviewCount).toBe(10);
    expect(res.body.data.distanceKm).toBeDefined();
  });

  it('returns 404 for unknown provider', async () => {
    mockProviderProfileFindUnique.mockResolvedValue(null);
    const res = await request(app).get('/api/v1/marketplace/providers/unknown');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('PROVIDER_NOT_FOUND');
  });

  it('does not expose raw backend errors to customer (error handling)', async () => {
    mockProviderProfileFindUnique.mockRejectedValue(new Error('prisma explode'));
    const res = await request(app).get('/api/v1/marketplace/providers/prov-err');
    expect(res.status).toBe(500);
    expect(res.body.error.code).toBe('INTERNAL_ERROR');
    expect(JSON.stringify(res.body)).not.toMatch(/prisma explode/i);
  });
});

describe('Phase 1 — empty and pagination', () => {
  it('empty state: no providers within 10 km returns empty array with total 0', async () => {
    mockProviderLocationFindMany.mockResolvedValue([]);
    const res = await request(app).get('/api/v1/marketplace/providers').query({ latitude: -26.2041, longitude: 28.0473, radiusKm: 10 });
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
    expect(res.body.meta.total).toBe(0);
  });

  it('pagination meta correct', async () => {
    // Create 3 providers at increasing distances
    const center = { latitude: -26.2041, longitude: 28.0473 };
    const mkLoc = (id: string, km: number) => ({
      id: `loc-${id}`,
      providerId: id,
      latitude: center.latitude + km / 111.0,
      longitude: center.longitude,
      isActive: true,
      city: 'Sandton',
      province: 'Gauteng',
      provider: { id, displayName: id, bio: null, profileImageUrl: null, coverageRadiusKm: 20, status: 'ACTIVE', verificationStatus: 'VERIFIED', tier: { code: 'T1', name: 'Individual' }, tierId: 't1' },
    });
    mockProviderLocationFindMany.mockResolvedValue([mkLoc('p1', 1), mkLoc('p2', 2), mkLoc('p3', 3)] as any);
    mockServiceFindMany.mockResolvedValue([]);
    mockReviewGroupBy.mockResolvedValue([]);

    const res = await request(app).get('/api/v1/marketplace/providers').query({ latitude: center.latitude, longitude: center.longitude, radiusKm: 10, page: 1, perPage: 2 });
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.meta.total).toBe(3);
    expect(res.body.meta.page).toBe(1);
    expect(res.body.meta.perPage).toBe(2);
  });
});

describe('Phase 1 — category filtering server-side', () => {
  it('filters by category via server (provider without service in category excluded)', async () => {
    const center = { latitude: -26.2041, longitude: 28.0473 };
    const loc = {
      id: 'loc-p1',
      providerId: 'p1',
      latitude: center.latitude + 0.01,
      longitude: center.longitude,
      isActive: true,
      city: 'Sandton',
      provider: { id: 'p1', displayName: 'P1', coverageRadiusKm: 10, status: 'ACTIVE', verificationStatus: 'VERIFIED', tier: { code: 'T1', name: 'Individual' }, tierId: 't1', bio: null, profileImageUrl: null },
    };
    mockProviderLocationFindMany.mockResolvedValue([loc] as any);
    // category exists
    mockServiceCategoryFindUnique.mockImplementation(async ({ where }: any) => {
      if (where.code === 'BARBERS' || where.id === 'cat-barbers') return { id: 'cat-barbers', code: 'BARBERS', name: 'Barbers' } as any;
      return null;
    });
    // provider has no service in that category
    mockServiceFindFirst.mockResolvedValue(null);

    const res = await request(app).get('/api/v1/marketplace/providers').query({ latitude: center.latitude, longitude: center.longitude, radiusKm: 10, categoryId: 'BARBERS' });
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(0);
  });
});
