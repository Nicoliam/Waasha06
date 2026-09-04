/**
 * Auth Vertical Slice — Comprehensive Security Tests
 * Covers: registration, login, /me, JWT security (issuer/audience/expiry/signature/malformed/alg),
 * authorization, provider ownership isolation, password hashing, rate-limit/brute-force,
 * audit hygiene, validation allowlisting.
 * Uses supertest + mocked Prisma (no DB required).
 * JWT verification enforces issuer=waasha, audience=waasha-app, algorithm HS256.
 */

import request from 'supertest';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Mocks must be hoisted before app import
const mockUserFindUnique = jest.fn();
const mockUserCreate = jest.fn();
const mockUserUpdate = jest.fn();
const mockRoleFindUnique = jest.fn();
const mockProviderTierFindUnique = jest.fn();
const mockAuditCreate = jest.fn();
const mockProviderProfileFindUnique = jest.fn();
const mockProviderProfileFindUniqueProvider = jest.fn();

jest.mock('../src/config/prisma', () => ({
  prisma: {
    user: { findUnique: mockUserFindUnique, create: mockUserCreate, update: mockUserUpdate },
    role: { findUnique: mockRoleFindUnique },
    providerTier: { findUnique: mockProviderTierFindUnique },
    auditLog: { create: mockAuditCreate },
    customerProfile: { findUnique: jest.fn().mockResolvedValue(null), update: jest.fn().mockResolvedValue({}) },
    providerProfile: { findUnique: mockProviderProfileFindUnique, update: jest.fn().mockResolvedValue({}) },
    providerLocation: { findMany: jest.fn().mockResolvedValue([]) },
    serviceCategory: { findUnique: jest.fn().mockResolvedValue(null) },
    service: { findFirst: jest.fn().mockResolvedValue(null) },
    adminSetting: { findMany: jest.fn().mockResolvedValue([]) },
    $queryRaw: jest.fn().mockResolvedValue([1]),
  },
}));

import { app } from '../src/app';
import { _resetBruteMap } from '../src/middleware/rateLimit';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-jwt-secret-change-me';

function token(payload: any, expiresIn = '1h') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn, issuer: 'waasha', audience: 'waasha-app', algorithm: 'HS256' } as any);
}

const ROLES: Record<string, any> = {
  CUSTOMER: { id: 'role-cust', code: 'CUSTOMER' },
  PROVIDER: { id: 'role-prov', code: 'PROVIDER' },
  ADMIN: { id: 'role-admin', code: 'ADMIN' },
};
const TIERS: Record<string, any> = {
  T1: { id: 'tier-t1', code: 'T1', isActive: true },
  T2: { id: 'tier-t2', code: 'T2', isActive: true },
  T3: { id: 'tier-t3', code: 'T3', isActive: true },
};

beforeEach(() => {
  jest.clearAllMocks();
  _resetBruteMap();
  mockAuditCreate.mockResolvedValue({});
  mockUserUpdate.mockResolvedValue({});
  mockRoleFindUnique.mockImplementation(async ({ where }: any) => ROLES[where.code] ?? null);
  mockProviderTierFindUnique.mockImplementation(async ({ where }: any) => TIERS[where.code] ?? null);
  mockUserFindUnique.mockResolvedValue(null);
  mockProviderProfileFindUnique.mockResolvedValue(null);
});

describe('POST /api/v1/auth/register/customer', () => {
  it('successful registration creates customer with hashed password and returns token', async () => {
    mockUserFindUnique.mockResolvedValue(null);
    let capturedHash = '';
    mockUserCreate.mockImplementation(async ({ data }: any) => {
      capturedHash = data.passwordHash;
      return {
        id: 'user-1',
        uuid: 'uuid-1',
        email: data.email,
        status: 'ACTIVE',
        roles: [{ role: ROLES.CUSTOMER }],
        customerProfile: { id: 'cust-1', displayName: 'Ava' },
      };
    });

    const res = await request(app).post('/api/v1/auth/register/customer').send({
      email: 'customer@example.com',
      password: 'StrongPass1',
      firstName: 'Ava',
      lastName: 'Dlamini',
    });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
    expect(res.body.data.user.email).toBe('customer@example.com');
    expect(res.body.data.user.roles).toContain('CUSTOMER');
    expect(res.body.data.user).not.toHaveProperty('passwordHash');
    expect(res.body.data.user).not.toHaveProperty('password');
    // password hash hygiene
    expect(capturedHash).not.toBe('StrongPass1');
    expect(capturedHash.length).toBeGreaterThan(20);
    expect(await bcrypt.compare('StrongPass1', capturedHash)).toBe(true);
    // audit hygiene
    expect(mockAuditCreate).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ action: 'REGISTER_CUSTOMER' }) }));
    const auditPayload = mockAuditCreate.mock.calls[0][0].data.afterJson;
    expect(auditPayload).not.toHaveProperty('password');
    expect(auditPayload).not.toHaveProperty('passwordHash');
    expect(auditPayload).not.toHaveProperty('token');
    // JWT structure
    const decoded: any = jwt.verify(res.body.data.token, JWT_SECRET, { issuer: 'waasha', audience: 'waasha-app', algorithms: ['HS256'] } as any);
    expect(decoded.iss).toBe('waasha');
    expect(decoded.aud).toBe('waasha-app');
    expect(decoded.sub).toBe('user-1');
    expect(decoded).not.toHaveProperty('password');
    expect(decoded).not.toHaveProperty('passwordHash');
  });

  it('duplicate email returns 409', async () => {
    mockUserFindUnique.mockResolvedValue({ id: 'existing', email: 'dup@example.com' });
    const res = await request(app).post('/api/v1/auth/register/customer').send({
      email: 'dup@example.com',
      password: 'StrongPass1',
    });
    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe('EMAIL_TAKEN');
  });

  it('duplicate email is case-insensitive (CAPS vs lower)', async () => {
    mockUserFindUnique.mockImplementation(async ({ where }: any) => {
      if (where.email === 'case@example.com') return { id: 'existing' };
      return null;
    });
    const res = await request(app).post('/api/v1/auth/register/customer').send({
      email: 'CASE@example.com',
      password: 'StrongPass1',
    });
    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe('EMAIL_TAKEN');
  });

  it('weak password (zod min length) rejected with 422 VALIDATION_ERROR', async () => {
    const res = await request(app).post('/api/v1/auth/register/customer').send({
      email: 'weak@example.com',
      password: 'short',
    });
    expect(res.status).toBe(422);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('password without uppercase/digit rejected with WEAK_PASSWORD', async () => {
    mockUserFindUnique.mockResolvedValue(null);
    const res = await request(app).post('/api/v1/auth/register/customer').send({
      email: 'weak2@example.com',
      password: 'alllowercase1',
    });
    expect(res.status).toBe(422);
    expect(res.body.error.code).toBe('WEAK_PASSWORD');
  });

  it('password without lowercase rejected', async () => {
    mockUserFindUnique.mockResolvedValue(null);
    const res = await request(app).post('/api/v1/auth/register/customer').send({
      email: 'weak3@example.com',
      password: 'ALLUPPERCASE1',
    });
    expect(res.status).toBe(422);
    expect(res.body.error.code).toBe('WEAK_PASSWORD');
  });

  it('common weak password rejected', async () => {
    mockUserFindUnique.mockResolvedValue(null);
    const res = await request(app).post('/api/v1/auth/register/customer').send({
      email: 'weak4@example.com',
      password: 'Password123',
    });
    // Password123 is in common weak list after lowercase normalization -> actual check is lowercase; test uses Password123 which matches password123 in set
    // Implementation checks password.toLowerCase() against COMMON_WEAK
    expect(res.status).toBe(422);
    expect(res.body.error.code).toBe('WEAK_PASSWORD');
  });

  it('invalid email rejected 422', async () => {
    const res = await request(app).post('/api/v1/auth/register/customer').send({
      email: 'not-an-email',
      password: 'StrongPass1',
    });
    expect(res.status).toBe(422);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('malformed body with missing email rejected', async () => {
    const res = await request(app).post('/api/v1/auth/register/customer').send({
      password: 'StrongPass1',
    });
    expect(res.status).toBe(422);
  });

  it('privilege escalation: client cannot set role ADMIN via extra field', async () => {
    mockUserFindUnique.mockResolvedValue(null);
    mockUserCreate.mockImplementation(async ({ data }: any) => ({
      id: 'user-esc',
      uuid: 'uuid-esc',
      email: data.email,
      status: 'ACTIVE',
      roles: [{ role: ROLES.CUSTOMER }],
      customerProfile: { id: 'cust-esc' },
    }));
    const res = await request(app).post('/api/v1/auth/register/customer').send({
      email: 'esc@example.com',
      password: 'StrongPass1',
      role: 'ADMIN',
      isAdmin: true,
      tierCode: 'T3',
    } as any);
    expect(res.status).toBe(201);
    expect(res.body.data.user.roles).not.toContain('ADMIN');
    expect(res.body.data.user.roles).toContain('CUSTOMER');
    // verify zod stripped extra fields — create was called with normalized data, not raw role field
    const createData = mockUserCreate.mock.calls[0][0].data;
    expect(createData).not.toHaveProperty('role');
    expect(createData).not.toHaveProperty('isAdmin');
    expect(createData).not.toHaveProperty('tierCode');
  });
});

describe('POST /api/v1/auth/register/provider', () => {
  it('successful provider registration T1 assigns PROVIDER role and tier', async () => {
    mockUserFindUnique.mockResolvedValue(null);
    mockUserCreate.mockImplementation(async ({ data }: any) => ({
      id: 'user-p1',
      uuid: 'uuid-p1',
      email: data.email,
      status: 'ACTIVE',
      roles: [{ role: ROLES.PROVIDER }],
      providerProfile: { id: 'prov-1', tierId: TIERS.T1.id, providerType: 'INDIVIDUAL', coverageRadiusKm: 10, tier: TIERS.T1 },
    }));
    const res = await request(app).post('/api/v1/auth/register/provider').send({
      email: 'provider1@example.com',
      password: 'StrongPass1',
      displayName: 'Ava — Braids',
      tierCode: 'T1',
    });
    expect(res.status).toBe(201);
    expect(res.body.data.user.roles).toContain('PROVIDER');
    expect(res.body.data.user).not.toHaveProperty('passwordHash');
    expect(res.body.data.providerProfile.tier.code).toBe('T1');
    expect(mockAuditCreate).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ action: 'REGISTER_PROVIDER' }) }));
    const afterJson = mockAuditCreate.mock.calls[0][0].data.afterJson;
    expect(afterJson).not.toHaveProperty('password');
    expect(afterJson).not.toHaveProperty('passwordHash');
  });

  it('T2 and T3 accepted', async () => {
    for (const tier of ['T2', 'T3'] as const) {
      jest.clearAllMocks();
      mockUserFindUnique.mockResolvedValue(null);
      mockRoleFindUnique.mockImplementation(async ({ where }: any) => ROLES[where.code] ?? null);
      mockProviderTierFindUnique.mockImplementation(async ({ where }: any) => TIERS[where.code] ?? null);
      mockAuditCreate.mockResolvedValue({});
      mockUserCreate.mockImplementation(async ({ data }: any) => ({
        id: `user-${tier}`,
        uuid: `uuid-${tier}`,
        email: data.email,
        status: 'ACTIVE',
        roles: [{ role: ROLES.PROVIDER }],
        providerProfile: { id: `prov-${tier}`, tierId: TIERS[tier].id, providerType: tier === 'T2' ? 'TEAM' : 'BUSINESS', tier: TIERS[tier] },
      }));
      const res = await request(app).post('/api/v1/auth/register/provider').send({
        email: `prov-${tier.toLowerCase()}@example.com`,
        password: 'StrongPass1',
        tierCode: tier,
      });
      expect(res.status).toBe(201);
      expect(res.body.data.providerProfile.tier.code).toBe(tier);
    }
  });

  it('invalid tier enum rejected with 422', async () => {
    const res = await request(app).post('/api/v1/auth/register/provider').send({
      email: 'badtier2@example.com',
      password: 'StrongPass1',
      tierCode: 'T9' as any,
    });
    expect(res.status).toBe(422);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('inactive tier rejected with INVALID_TIER', async () => {
    mockUserFindUnique.mockResolvedValue(null);
    mockProviderTierFindUnique.mockResolvedValue({ id: 'tier-t1', code: 'T1', isActive: false });
    const res = await request(app).post('/api/v1/auth/register/provider').send({
      email: 'inactivetier@example.com',
      password: 'StrongPass1',
      tierCode: 'T1',
    });
    expect(res.status).toBe(422);
    expect(res.body.error.code).toBe('INVALID_TIER');
  });

  it('cannot escalate to ADMIN via provider registration', async () => {
    mockUserFindUnique.mockResolvedValue(null);
    mockProviderTierFindUnique.mockImplementation(async ({ where }: any) => TIERS[where.code] ?? null);
    mockUserCreate.mockImplementation(async ({ data }: any) => ({
      id: 'user-noesc',
      uuid: 'uuid-noesc',
      email: data.email,
      status: 'ACTIVE',
      roles: [{ role: ROLES.PROVIDER }],
      providerProfile: { id: 'prov-noesc', tier: TIERS.T1 },
    }));
    const res = await request(app).post('/api/v1/auth/register/provider').send({
      email: 'noesc@example.com',
      password: 'StrongPass1',
      tierCode: 'T1',
      role: 'ADMIN',
    } as any);
    expect(res.status).toBe(201);
    expect(res.body.data.user.roles).not.toContain('ADMIN');
    expect(res.body.data.user.roles).toContain('PROVIDER');
  });

  it('tierCode cannot be injected as arbitrary string', async () => {
    const res = await request(app).post('/api/v1/auth/register/provider').send({
      email: 'inject@example.com',
      password: 'StrongPass1',
      tierCode: 'ADMIN' as any,
    });
    expect(res.status).toBe(422);
  });

  it('duplicate provider email 409', async () => {
    mockUserFindUnique.mockResolvedValue({ id: 'existing' });
    const res = await request(app).post('/api/v1/auth/register/provider').send({
      email: 'dup-prov@example.com',
      password: 'StrongPass1',
      tierCode: 'T1',
    });
    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe('EMAIL_TAKEN');
  });
});

describe('POST /api/v1/auth/login', () => {
  it('successful login returns token and user without passwordHash', async () => {
    const hash = await bcrypt.hash('StrongPass1', 10);
    mockUserFindUnique.mockResolvedValue({
      id: 'user-login',
      uuid: 'uuid-login',
      email: 'login@example.com',
      passwordHash: hash,
      status: 'ACTIVE',
      roles: [{ role: ROLES.CUSTOMER }],
      providerProfile: null,
    });
    const res = await request(app).post('/api/v1/auth/login').send({ email: 'login@example.com', password: 'StrongPass1' });
    expect(res.status).toBe(200);
    expect(res.body.data.token).toBeDefined();
    expect(res.body.data.user.email).toBe('login@example.com');
    expect(res.body.data.user).not.toHaveProperty('passwordHash');
    expect(res.body.data.user).not.toHaveProperty('password');
    const decoded: any = jwt.verify(res.body.data.token, JWT_SECRET, { issuer: 'waasha', audience: 'waasha-app', algorithms: ['HS256'] } as any);
    expect(decoded.sub).toBe('user-login');
    expect(decoded.roles).toContain('CUSTOMER');
    expect(decoded.iss).toBe('waasha');
    expect(decoded.aud).toBe('waasha-app');
    // token must not contain sensitive fields
    expect(decoded).not.toHaveProperty('password');
    expect(decoded).not.toHaveProperty('passwordHash');
  });

  it('invalid credentials wrong password => 401 without leaking existence', async () => {
    const hash = await bcrypt.hash('StrongPass1', 10);
    mockUserFindUnique.mockResolvedValue({
      id: 'user-login2',
      uuid: 'uuid-2',
      email: 'login2@example.com',
      passwordHash: hash,
      status: 'ACTIVE',
      roles: [{ role: ROLES.CUSTOMER }],
    });
    const res = await request(app).post('/api/v1/auth/login').send({ email: 'login2@example.com', password: 'WrongPass1' });
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('INVALID_CREDENTIALS');
    expect(res.body.error.message).not.toMatch(/password/i);
    // audit should not contain password
    const failureAudit = mockAuditCreate.mock.calls.find((c: any) => c[0].data.action === 'LOGIN_FAILURE');
    if (failureAudit) {
      expect(failureAudit[0].data.afterJson).not.toHaveProperty('password');
      expect(failureAudit[0].data.afterJson).not.toHaveProperty('passwordHash');
    }
  });

  it('unknown email => 401 with same code as wrong password (enumeration protection)', async () => {
    mockUserFindUnique.mockResolvedValue(null);
    const res = await request(app).post('/api/v1/auth/login').send({ email: 'unknown@example.com', password: 'AnyPass1' });
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('INVALID_CREDENTIALS');
  });

  it('suspended account => 403', async () => {
    const hash = await bcrypt.hash('StrongPass1', 10);
    mockUserFindUnique.mockResolvedValue({
      id: 'user-susp',
      uuid: 'uuid-susp',
      email: 'susp@example.com',
      passwordHash: hash,
      status: 'SUSPENDED',
      roles: [{ role: ROLES.CUSTOMER }],
    });
    const res = await request(app).post('/api/v1/auth/login').send({ email: 'susp@example.com', password: 'StrongPass1' });
    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe('ACCOUNT_INACTIVE');
  });

  it('locked account => 423', async () => {
    const hash = await bcrypt.hash('StrongPass1', 10);
    mockUserFindUnique.mockResolvedValue({
      id: 'user-locked',
      uuid: 'uuid-locked',
      email: 'locked@example.com',
      passwordHash: hash,
      status: 'LOCKED',
      roles: [{ role: ROLES.CUSTOMER }],
    });
    const res = await request(app).post('/api/v1/auth/login').send({ email: 'locked@example.com', password: 'StrongPass1' });
    expect(res.status).toBe(423);
    expect(res.body.error.code).toBe('ACCOUNT_LOCKED');
  });

  it('deactivated account => 403', async () => {
    const hash = await bcrypt.hash('StrongPass1', 10);
    mockUserFindUnique.mockResolvedValue({
      id: 'user-deact',
      uuid: 'uuid-deact',
      email: 'deact@example.com',
      passwordHash: hash,
      status: 'DEACTIVATED',
      roles: [{ role: ROLES.CUSTOMER }],
    });
    const res = await request(app).post('/api/v1/auth/login').send({ email: 'deact@example.com', password: 'StrongPass1' });
    expect(res.status).toBe(403);
  });

  it('missing body fields => 422', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({});
    expect(res.status).toBe(422);
  });
});

describe('GET /api/v1/auth/me', () => {
  it('authenticated /me returns own profile with roles and without passwordHash', async () => {
    const tok = token({ sub: 'user-me', uuid: 'uuid-me', email: 'me@example.com', roles: ['CUSTOMER'] });
    let callCount = 0;
    mockUserFindUnique.mockImplementation(async ({ where }: any) => {
      callCount++;
      if (where.id === 'user-me') {
        if (callCount === 1) return { id: 'user-me', status: 'ACTIVE', uuid: 'uuid-me', email: 'me@example.com' };
        return {
          id: 'user-me',
          uuid: 'uuid-me',
          email: 'me@example.com',
          phone: null,
          status: 'ACTIVE',
          roles: [{ role: ROLES.CUSTOMER }],
          customerProfile: { id: 'cust-me', displayName: 'Me' },
          providerProfile: null,
        };
      }
      return null;
    });

    const res = await request(app).get('/api/v1/auth/me').set('Authorization', `Bearer ${tok}`);
    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe('me@example.com');
    expect(res.body.data.roles).toContain('CUSTOMER');
    expect(res.body.data).not.toHaveProperty('passwordHash');
    expect(res.body.data).not.toHaveProperty('password');
  });

  it('missing token => 401', async () => {
    const res = await request(app).get('/api/v1/auth/me');
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('missing Bearer prefix => 401', async () => {
    const tok = token({ sub: 'user-me', uuid: 'u', email: 'a@b.com', roles: ['CUSTOMER'] });
    mockUserFindUnique.mockResolvedValue({ id: 'user-me', status: 'ACTIVE' });
    const res = await request(app).get('/api/v1/auth/me').set('Authorization', tok);
    expect(res.status).toBe(401);
  });

  it('malformed token (not JWT) => 401', async () => {
    const res = await request(app).get('/api/v1/auth/me').set('Authorization', 'Bearer not-a-jwt');
    expect(res.status).toBe(401);
  });

  it('malformed token (truncated signature) => 401', async () => {
    const tok = token({ sub: 'user-x', uuid: 'u', email: 'a@b.com', roles: ['CUSTOMER'] });
    const truncated = tok.slice(0, -10);
    const res = await request(app).get('/api/v1/auth/me').set('Authorization', `Bearer ${truncated}`);
    expect(res.status).toBe(401);
  });

  it('invalid signature (signed with wrong secret) => 401', async () => {
    const badTok = jwt.sign({ sub: 'user-bad', uuid: 'u', email: 'a@b.com', roles: ['CUSTOMER'] }, 'wrong-secret', { expiresIn: '1h', issuer: 'waasha', audience: 'waasha-app', algorithm: 'HS256' } as any);
    mockUserFindUnique.mockResolvedValue({ id: 'user-bad', status: 'ACTIVE' });
    const res = await request(app).get('/api/v1/auth/me').set('Authorization', `Bearer ${badTok}`);
    expect(res.status).toBe(401);
  });

  it('none algorithm token => 401', async () => {
    // Create an unsigned token with alg none
    const header = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64url');
    const payload = Buffer.from(JSON.stringify({ sub: 'user-none', uuid: 'u', email: 'a@b.com', roles: ['CUSTOMER'], iss: 'waasha', aud: 'waasha-app', exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url');
    const noneTok = `${header}.${payload}.`;
    const res = await request(app).get('/api/v1/auth/me').set('Authorization', `Bearer ${noneTok}`);
    expect(res.status).toBe(401);
  });

  it('expired token => 401', async () => {
    const expTok = jwt.sign({ sub: 'user-exp', uuid: 'u', email: 'a@b.com', roles: ['CUSTOMER'] }, JWT_SECRET, { expiresIn: '0s', issuer: 'waasha', audience: 'waasha-app', algorithm: 'HS256' } as any);
    await new Promise((r) => setTimeout(r, 50));
    const res = await request(app).get('/api/v1/auth/me').set('Authorization', `Bearer ${expTok}`);
    expect(res.status).toBe(401);
  });

  it('token with wrong audience rejected => 401', async () => {
    const badAud = jwt.sign({ sub: 'user-bad', uuid: 'u', email: 'a@b.com', roles: ['CUSTOMER'] }, JWT_SECRET, { expiresIn: '1h', issuer: 'waasha', audience: 'wrong-aud', algorithm: 'HS256' } as any);
    mockUserFindUnique.mockResolvedValue({ id: 'user-bad', status: 'ACTIVE', uuid: 'u', email: 'a@b.com' });
    const res = await request(app).get('/api/v1/auth/me').set('Authorization', `Bearer ${badAud}`);
    expect(res.status).toBe(401);
  });

  it('token with wrong issuer rejected => 401', async () => {
    const badIss = jwt.sign({ sub: 'user-bad2', uuid: 'u', email: 'a@b.com', roles: ['CUSTOMER'] }, JWT_SECRET, { expiresIn: '1h', issuer: 'evil', audience: 'waasha-app', algorithm: 'HS256' } as any);
    mockUserFindUnique.mockResolvedValue({ id: 'user-bad2', status: 'ACTIVE', uuid: 'u', email: 'a@b.com' });
    const res = await request(app).get('/api/v1/auth/me').set('Authorization', `Bearer ${badIss}`);
    expect(res.status).toBe(401);
  });

  it('token without issuer/audience => 401', async () => {
    const noIssAud = jwt.sign({ sub: 'user-no', uuid: 'u', email: 'a@b.com', roles: ['CUSTOMER'] }, JWT_SECRET, { expiresIn: '1h', algorithm: 'HS256' } as any);
    mockUserFindUnique.mockResolvedValue({ id: 'user-no', status: 'ACTIVE' });
    const res = await request(app).get('/api/v1/auth/me').set('Authorization', `Bearer ${noIssAud}`);
    expect(res.status).toBe(401);
  });

  it('token for non-existent user (DB check) => 401', async () => {
    const tok = token({ sub: 'nonexistent', uuid: 'u-non', email: 'non@waasha.test', roles: ['CUSTOMER'] });
    mockUserFindUnique.mockResolvedValue(null); // user not found in DB
    const res = await request(app).get('/api/v1/auth/me').set('Authorization', `Bearer ${tok}`);
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('token for suspended user after issuance => 403', async () => {
    const tok = token({ sub: 'user-susp', uuid: 'u', email: 'a@b.com', roles: ['CUSTOMER'] });
    mockUserFindUnique.mockResolvedValue({ id: 'user-susp', status: 'SUSPENDED' });
    const res = await request(app).get('/api/v1/auth/me').set('Authorization', `Bearer ${tok}`);
    expect(res.status).toBe(403);
  });

  it('token for locked user after issuance => 423', async () => {
    const tok = token({ sub: 'user-locked', uuid: 'u', email: 'a@b.com', roles: ['CUSTOMER'] });
    mockUserFindUnique.mockResolvedValue({ id: 'user-locked', status: 'LOCKED' });
    const res = await request(app).get('/api/v1/auth/me').set('Authorization', `Bearer ${tok}`);
    expect(res.status).toBe(423);
  });

  it('DB error during auth check => 503 (no fallback auth)', async () => {
    const tok = token({ sub: 'user-db', uuid: 'u', email: 'a@b.com', roles: ['CUSTOMER'] });
    mockUserFindUnique.mockRejectedValue(new Error('DB down'));
    const res = await request(app).get('/api/v1/auth/me').set('Authorization', `Bearer ${tok}`);
    expect(res.status).toBe(503);
    expect(res.body.error.code).toBe('NOT_READY');
  });
});

describe('Provider ownership isolation', () => {
  it('provider A cannot read provider B via /providers/me — always returns own', async () => {
    const tokA = token({ sub: 'user-a', uuid: 'u-a', email: 'a@waasha.test', roles: ['PROVIDER'], providerId: 'prov-a' });
    mockUserFindUnique.mockImplementation(async ({ where }: any) => {
      if (where.id === 'user-a') return { id: 'user-a', status: 'ACTIVE', uuid: 'u-a', email: 'a@waasha.test' };
      return null;
    });
    mockProviderProfileFindUnique.mockImplementation(async ({ where }: any) => {
      if (where.userId === 'user-a') return { id: 'prov-a', userId: 'user-a', coverageRadiusKm: 15, tier: TIERS.T1 };
      return null;
    });
    const res = await request(app).get('/api/v1/providers/me').set('Authorization', `Bearer ${tokA}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe('prov-a');
    // ensure providerId from JWT does not override DB lookup — server uses userId
    expect(mockProviderProfileFindUnique).toHaveBeenCalledWith(expect.objectContaining({ where: { userId: 'user-a' } }));
  });

  it('cross-user access: attacker with valid token cannot fetch victim provider by manipulating payload', async () => {
    const attackerTok = token({ sub: 'attacker', uuid: 'u-att', email: 'att@waasha.test', roles: ['PROVIDER'], providerId: 'prov-victim' });
    mockUserFindUnique.mockResolvedValue({ id: 'attacker', status: 'ACTIVE', uuid: 'u-att', email: 'att@waasha.test' });
    mockProviderProfileFindUnique.mockImplementation(async ({ where }: any) => {
      // only attacker own profile exists
      if (where.userId === 'attacker') return { id: 'prov-attacker', userId: 'attacker', coverageRadiusKm: 10, tier: TIERS.T1 };
      return null;
    });
    const res = await request(app).get('/api/v1/providers/me').set('Authorization', `Bearer ${attackerTok}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe('prov-attacker');
    expect(res.body.data.id).not.toBe('prov-victim');
  });

  it('customer cannot access provider resource — returns 404 PROVIDER_NOT_FOUND', async () => {
    const custTok = token({ sub: 'cust-user', uuid: 'u-c', email: 'cust@waasha.test', roles: ['CUSTOMER'] });
    mockUserFindUnique.mockResolvedValue({ id: 'cust-user', status: 'ACTIVE', uuid: 'u-c', email: 'cust@waasha.test' });
    mockProviderProfileFindUnique.mockResolvedValue(null);
    const res = await request(app).get('/api/v1/providers/me').set('Authorization', `Bearer ${custTok}`);
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('PROVIDER_NOT_FOUND');
  });

  it('customer tenant isolation: cannot patch customer profile of another user', async () => {
    // Customer routes use authUser.userId to scope queries, so any token only affects own profile
    const attackerTok = token({ sub: 'attacker-cust', uuid: 'u-att', email: 'att@waasha.test', roles: ['CUSTOMER'] });
    mockUserFindUnique.mockResolvedValue({ id: 'attacker-cust', status: 'ACTIVE', uuid: 'u-att', email: 'att@waasha.test' });
    // mock customer profile lookup for attacker — simulate that update would target attacker own record
    const { prisma } = require('../src/config/prisma');
    // providerProfile already mocked; customerProfile findUnique will be handled via actual mock
    // For PATCH /customers/me we patch own profile only
    const mockCustFind = jest.fn().mockResolvedValue({ id: 'cust-attacker', userId: 'attacker-cust', displayName: 'Attacker' });
    const mockCustUpdate = jest.fn().mockResolvedValue({ id: 'cust-attacker', displayName: 'Hacked' });
    (prisma.customerProfile.findUnique as any) = mockCustFind;
    (prisma.customerProfile.update as any) = mockCustUpdate;
    const res = await request(app).patch('/api/v1/customers/me').set('Authorization', `Bearer ${attackerTok}`).send({ displayName: 'Hacked' });
    // Should succeed for own profile, but update was scoped to attacker-cust, not victim
    expect(mockCustUpdate).toHaveBeenCalledWith(expect.objectContaining({ where: { userId: 'attacker-cust' } }));
  });
});

describe('Logout and brute-force', () => {
  it('POST /auth/logout requires auth — 401 without token', async () => {
    const res = await request(app).post('/api/v1/auth/logout');
    expect(res.status).toBe(401);
  });

  it('POST /auth/logout succeeds with valid token and audits without leaking secrets', async () => {
    const tok = token({ sub: 'user-logout', uuid: 'u-lo', email: 'lo@waasha.test', roles: ['CUSTOMER'] });
    mockUserFindUnique.mockResolvedValue({ id: 'user-logout', status: 'ACTIVE', uuid: 'u-lo', email: 'lo@waasha.test' });
    const res = await request(app).post('/api/v1/auth/logout').set('Authorization', `Bearer ${tok}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(mockAuditCreate).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ action: 'LOGOUT' }) }));
    const lastCall = mockAuditCreate.mock.calls[mockAuditCreate.mock.calls.length - 1][0].data;
    expect(lastCall.afterJson ?? lastCall.beforeJson ?? {}).not.toHaveProperty('token');
    // audit afterJson for logout is undefined (only actor/action) — ensure no secret present
    const auditJson = lastCall.afterJson;
    if (auditJson) {
      expect(auditJson).not.toHaveProperty('token');
      expect(auditJson).not.toHaveProperty('password');
      expect(auditJson).not.toHaveProperty('passwordHash');
      expect(auditJson).not.toHaveProperty('jwt');
    }
  });

  it('brute-force: after 5 failed logins, 6th is 429', async () => {
    const hash = await bcrypt.hash('StrongPass1', 10);
    mockUserFindUnique.mockResolvedValue({
      id: 'user-brute',
      uuid: 'uuid-brute',
      email: 'brute@example.com',
      passwordHash: hash,
      status: 'ACTIVE',
      roles: [{ role: ROLES.CUSTOMER }],
    });
    for (let i = 0; i < 5; i++) {
      const r = await request(app).post('/api/v1/auth/login').send({ email: 'brute@example.com', password: 'WrongPass1' });
      expect(r.status).toBe(401);
    }
    const r6 = await request(app).post('/api/v1/auth/login').send({ email: 'brute@example.com', password: 'WrongPass1' });
    expect(r6.status).toBe(429);
    expect(r6.body.error.code).toBe('RATE_LIMITED');
  });

  it('successful login clears brute-force counter', async () => {
    const hash = await bcrypt.hash('StrongPass1', 10);
    mockUserFindUnique.mockResolvedValue({
      id: 'user-brute2',
      uuid: 'uuid-brute2',
      email: 'brute2@example.com',
      passwordHash: hash,
      status: 'ACTIVE',
      roles: [{ role: ROLES.CUSTOMER }],
    });
    // 3 failures
    for (let i = 0; i < 3; i++) {
      await request(app).post('/api/v1/auth/login').send({ email: 'brute2@example.com', password: 'WrongPass1' });
    }
    // success clears
    const ok = await request(app).post('/api/v1/auth/login').send({ email: 'brute2@example.com', password: 'StrongPass1' });
    expect(ok.status).toBe(200);
    // next failure should be 401 not 429
    const nextFail = await request(app).post('/api/v1/auth/login').send({ email: 'brute2@example.com', password: 'WrongPass1' });
    expect(nextFail.status).toBe(401);
  });
});

describe('Password hashing unit', () => {
  it('hashPassword produces bcrypt hash and verify works', async () => {
    const { hashPassword, verifyPassword } = await import('../src/modules/auth/password');
    const hash = await hashPassword('StrongPass1');
    expect(hash).not.toBe('StrongPass1');
    expect(hash.startsWith('$2a$') || hash.startsWith('$2b$')).toBe(true);
    expect(await verifyPassword('StrongPass1', hash)).toBe(true);
    expect(await verifyPassword('WrongPass1', hash)).toBe(false);
  });
});
