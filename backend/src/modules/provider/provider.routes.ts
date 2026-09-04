import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../../config/prisma';
import { authMiddleware } from '../../middleware/auth';
import { getMarketplaceConfig } from '../marketplace/marketplace-config.service';

const router = Router();

// All /providers/me/* require authentication
router.use(authMiddleware);

// GET /api/v1/providers/me — own provider profile (tenant isolation)
router.get('/me', async (req: Request, res: Response) => {
  const authUser = req.authUser!;
  const profile = await prisma.providerProfile.findUnique({
    where: { userId: authUser.userId },
    include: { tier: true },
  });
  if (!profile) {
    return res.status(404).json({ success: false, error: { code: 'PROVIDER_NOT_FOUND', message: 'Provider profile not found' } });
  }
  return res.json({ success: true, data: profile });
});

// GET /api/v1/providers/me/coverage
router.get('/me/coverage', async (req: Request, res: Response) => {
  const authUser = req.authUser!;
  // Tenant isolation: provider ownership — must own providerProfile
  const profile = await prisma.providerProfile.findUnique({
    where: { userId: authUser.userId },
    select: { id: true, coverageRadiusKm: true },
  });
  if (!profile) {
    return res.status(404).json({
      success: false,
      error: { code: 'PROVIDER_NOT_FOUND', message: 'Provider profile not found for authenticated user' },
    });
  }
  return res.json({ success: true, data: { coverageRadiusKm: profile.coverageRadiusKm } });
});

// PUT /api/v1/providers/me/coverage
const updateSchema = z.object({
  coverageRadiusKm: z.number(),
});

router.put('/me/coverage', async (req: Request, res: Response) => {
  const authUser = req.authUser!;
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Invalid body', details: parsed.error.flatten() },
    });
  }
  const { coverageRadiusKm } = parsed.data;

  const config = await getMarketplaceConfig();
  const allowed = config.allowed_provider_coverages_km;
  const max = config.max_provider_coverage_km;

  // Backend-authoritative validation — never trust frontend
  if (!allowed.includes(coverageRadiusKm)) {
    return res.status(422).json({
      success: false,
      error: {
        code: 'INVALID_COVERAGE',
        message: `coverageRadiusKm must be one of [${allowed.join(', ')}]`,
        details: { allowed, received: coverageRadiusKm },
      },
    });
  }
  if (coverageRadiusKm > max) {
    return res.status(422).json({
      success: false,
      error: { code: 'COVERAGE_EXCEEDS_MAX', message: `coverageRadiusKm must not exceed ${max}` },
    });
  }
  if (coverageRadiusKm < Math.min(...allowed)) {
    return res.status(422).json({
      success: false,
      error: { code: 'COVERAGE_BELOW_MIN', message: `coverageRadiusKm must be at least ${Math.min(...allowed)}` },
    });
  }

  const profile = await prisma.providerProfile.findUnique({
    where: { userId: authUser.userId },
    select: { id: true, userId: true },
  });
  if (!profile) {
    return res.status(404).json({
      success: false,
      error: { code: 'PROVIDER_NOT_FOUND', message: 'Provider profile not found' },
    });
  }

  // Ownership enforced by userId match — cross-provider update impossible because profile lookup is by authUser.userId
  const before = await prisma.providerProfile.findUnique({ where: { id: profile.id } });
  const updated = await prisma.providerProfile.update({
    where: { id: profile.id },
    data: { coverageRadiusKm },
    select: { coverageRadiusKm: true, updatedAt: true },
  });

  // Audit log — security requirement
  try {
    await prisma.auditLog.create({
      data: {
        actorUserId: authUser.userId,
        action: 'PROVIDER_COVERAGE_UPDATED',
        entityType: 'provider_profile',
        entityId: profile.id,
        beforeJson: { coverageRadiusKm: before?.coverageRadiusKm } as any,
        afterJson: { coverageRadiusKm: updated.coverageRadiusKm } as any,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });
  } catch {}

  return res.json({ success: true, data: { coverageRadiusKm: updated.coverageRadiusKm } });
});

export default router;
