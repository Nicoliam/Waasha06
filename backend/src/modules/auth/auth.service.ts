import { prisma } from '../../config/prisma';
import { hashPassword, verifyPassword, validatePasswordStrength } from './password';
import { normalizeEmail } from './auth.schemas';
import { signAccessToken } from './jwt';

export type PublicUser = {
  id: string;
  uuid: string;
  email: string | null;
  status: string;
  roles: string[];
};

function toPublicRoles(roles: { role: { code: string } }[]): string[] {
  return roles.map((r) => r.role.code);
}

export async function registerCustomer(input: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  ipAddress?: string;
  userAgent?: string;
}): Promise<{ user: PublicUser; token: string }> {
  const normalizedEmail = normalizeEmail(input.email);

  const pwCheck = validatePasswordStrength(input.password);
  if (!pwCheck.valid) {
    const err: any = new Error(pwCheck.reason);
    err.status = 422;
    err.code = 'WEAK_PASSWORD';
    throw err;
  }

  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    const err: any = new Error('Email already registered');
    err.status = 409;
    err.code = 'EMAIL_TAKEN';
    throw err;
  }

  const customerRole = await prisma.role.findUnique({ where: { code: 'CUSTOMER' } });
  if (!customerRole) throw new Error('CUSTOMER role not seeded');

  const hash = await hashPassword(input.password);
  const displayName =
    input.displayName ??
    [input.firstName, input.lastName].filter(Boolean).join(' ') ??
    normalizedEmail.split('@')[0];

  const user = await prisma.user.create({
    data: {
      email: normalizedEmail,
      passwordHash: hash,
      status: 'ACTIVE',
      roles: { create: { roleId: customerRole.id } },
      customerProfile: {
        create: {
          firstName: input.firstName ?? null,
          lastName: input.lastName ?? null,
          displayName,
        },
      },
    },
    include: {
      roles: { include: { role: true } },
      customerProfile: true,
      providerProfile: true,
    },
  });

  // Audit — REGISTER_CUSTOMER
  try {
    await prisma.auditLog.create({
      data: {
        actorUserId: user.id,
        action: 'REGISTER_CUSTOMER',
        entityType: 'user',
        entityId: user.id,
        afterJson: { email: normalizedEmail, roles: ['CUSTOMER'] } as any,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
      },
    });
  } catch {}

  const roles = toPublicRoles(user.roles as any);
  const token = signAccessToken({
    sub: user.id,
    uuid: user.uuid,
    email: user.email,
    roles,
  });

  return {
    user: { id: user.id, uuid: user.uuid, email: user.email, status: user.status, roles },
    token,
  };
}

export async function registerProvider(input: {
  email: string;
  password: string;
  displayName?: string;
  tierCode: 'T1' | 'T2' | 'T3';
  bio?: string;
  ipAddress?: string;
  userAgent?: string;
}): Promise<{ user: PublicUser; token: string; providerProfile: any }> {
  const normalizedEmail = normalizeEmail(input.email);

  const pwCheck = validatePasswordStrength(input.password);
  if (!pwCheck.valid) {
    const err: any = new Error(pwCheck.reason);
    err.status = 422;
    err.code = 'WEAK_PASSWORD';
    throw err;
  }

  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    const err: any = new Error('Email already registered');
    err.status = 409;
    err.code = 'EMAIL_TAKEN';
    throw err;
  }

  // Validate tierCode maps to existing provider_tiers (server-authoritative, no client-chosen tier bypass)
  const tier = await prisma.providerTier.findUnique({ where: { code: input.tierCode } });
  if (!tier || !tier.isActive) {
    const err: any = new Error('Invalid tier');
    err.status = 422;
    err.code = 'INVALID_TIER';
    throw err;
  }

  const providerRole = await prisma.role.findUnique({ where: { code: 'PROVIDER' } });
  if (!providerRole) throw new Error('PROVIDER role not seeded');

  const hash = await hashPassword(input.password);
  const providerType = input.tierCode === 'T1' ? 'INDIVIDUAL' : input.tierCode === 'T2' ? 'TEAM' : 'BUSINESS';

  const user = await prisma.user.create({
    data: {
      email: normalizedEmail,
      passwordHash: hash,
      status: 'ACTIVE',
      roles: { create: { roleId: providerRole.id } },
      providerProfile: {
        create: {
          tierId: tier.id,
          providerType: providerType as any,
          displayName: input.displayName ?? normalizedEmail.split('@')[0],
          bio: input.bio ?? null,
          coverageRadiusKm: 10,
          customRequestsEnabled: false,
          verificationStatus: 'UNVERIFIED',
          status: 'ACTIVE',
        },
      },
    },
    include: {
      roles: { include: { role: true } },
      providerProfile: { include: { tier: true } },
      customerProfile: true,
    },
  });

  try {
    await prisma.auditLog.create({
      data: {
        actorUserId: user.id,
        action: 'REGISTER_PROVIDER',
        entityType: 'provider_profile',
        entityId: (user as any).providerProfile?.id,
        afterJson: { email: normalizedEmail, tierCode: input.tierCode, providerType } as any,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
      },
    });
  } catch {}

  const roles = toPublicRoles(user.roles as any);
  const providerProfile = (user as any).providerProfile;
  const token = signAccessToken({
    sub: user.id,
    uuid: user.uuid,
    email: user.email,
    roles,
    providerId: providerProfile?.id,
  });

  return {
    user: { id: user.id, uuid: user.uuid, email: user.email, status: user.status, roles },
    token,
    providerProfile,
  };
}

export async function login(input: {
  email: string;
  password: string;
  ipAddress?: string;
  userAgent?: string;
}): Promise<{ user: PublicUser; token: string }> {
  const normalizedEmail = normalizeEmail(input.email);

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    include: {
      roles: { include: { role: true } },
      providerProfile: { select: { id: true } },
      customerProfile: true,
    },
  });

  if (!user || !user.passwordHash) {
    try {
      await prisma.auditLog.create({
        data: {
          actorUserId: null,
          action: 'LOGIN_FAILURE',
          entityType: 'user',
          entityId: null,
          afterJson: { email: normalizedEmail, reason: 'UNKNOWN_EMAIL_OR_NO_PASSWORD' } as any,
          ipAddress: input.ipAddress,
          userAgent: input.userAgent,
        },
      });
    } catch {}
    const err: any = new Error('Invalid credentials');
    err.status = 401;
    err.code = 'INVALID_CREDENTIALS';
    throw err;
  }

  // Account status check — locked/suspended/deactivated cannot log in
  if (user.status === 'SUSPENDED' || user.status === 'DEACTIVATED' || user.status === 'DELETED') {
    try {
      await prisma.auditLog.create({
        data: {
          actorUserId: user.id,
          action: 'LOGIN_FAILURE',
          entityType: 'user',
          entityId: user.id,
          afterJson: { email: normalizedEmail, reason: `ACCOUNT_${user.status}` } as any,
          ipAddress: input.ipAddress,
          userAgent: input.userAgent,
        },
      });
    } catch {}
    const err: any = new Error('Account is not active');
    err.status = 403;
    err.code = 'ACCOUNT_INACTIVE';
    throw err;
  }

  if (user.status === 'LOCKED') {
    try {
      await prisma.auditLog.create({
        data: {
          actorUserId: user.id,
          action: 'LOGIN_FAILURE',
          entityType: 'user',
          entityId: user.id,
          afterJson: { email: normalizedEmail, reason: 'ACCOUNT_LOCKED' } as any,
          ipAddress: input.ipAddress,
          userAgent: input.userAgent,
        },
      });
    } catch {}
    const err: any = new Error('Account is locked. Try again later.');
    err.status = 423;
    err.code = 'ACCOUNT_LOCKED';
    throw err;
  }

  const ok = await verifyPassword(input.password, user.passwordHash);
  if (!ok) {
    try {
      await prisma.auditLog.create({
        data: {
          actorUserId: user.id,
          action: 'LOGIN_FAILURE',
          entityType: 'user',
          entityId: user.id,
          afterJson: { email: normalizedEmail } as any,
          ipAddress: input.ipAddress,
          userAgent: input.userAgent,
        },
      });
    } catch {}
    const err: any = new Error('Invalid credentials');
    err.status = 401;
    err.code = 'INVALID_CREDENTIALS';
    throw err;
  }

  // Success
  await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } }).catch(() => {});

  try {
    await prisma.auditLog.create({
      data: {
        actorUserId: user.id,
        action: 'LOGIN_SUCCESS',
        entityType: 'user',
        entityId: user.id,
        afterJson: { email: normalizedEmail } as any,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
      },
    });
  } catch {}

  const roles = toPublicRoles(user.roles as any);
  const providerId = (user as any).providerProfile?.id;

  const token = signAccessToken({
    sub: user.id,
    uuid: user.uuid,
    email: user.email,
    roles,
    providerId,
  });

  return {
    user: { id: user.id, uuid: user.uuid, email: user.email, status: user.status, roles },
    token,
  };
}

export async function getMe(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      roles: { include: { role: true } },
      customerProfile: true,
      providerProfile: { include: { tier: true } },
    },
  });
  if (!user) {
    const err: any = new Error('User not found');
    err.status = 404;
    err.code = 'USER_NOT_FOUND';
    throw err;
  }
  const roles = toPublicRoles(user.roles as any);
  return {
    id: user.id,
    uuid: user.uuid,
    email: user.email,
    phone: user.phone,
    status: user.status,
    roles,
    customerProfile: (user as any).customerProfile ?? null,
    providerProfile: (user as any).providerProfile ?? null,
  };
}
