import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../../config/prisma';
import { authMiddleware } from '../../middleware/auth';

const router = Router();

router.use(authMiddleware);

// GET /api/v1/customers/me — tenant isolation: only own profile
router.get('/me', async (req: Request, res: Response) => {
  const authUser = req.authUser!;
  const profile = await prisma.customerProfile.findUnique({
    where: { userId: authUser.userId },
    include: { user: { select: { id: true, uuid: true, email: true, status: true } } },
  });
  if (!profile) {
    return res.status(404).json({ success: false, error: { code: 'CUSTOMER_NOT_FOUND', message: 'Customer profile not found' } });
  }
  return res.json({ success: true, data: profile });
});

// PATCH /api/v1/customers/me — update own customer profile (mass-assignment safe)
const patchSchema = z.object({
  firstName: z.string().trim().min(1).max(80).optional(),
  lastName: z.string().trim().min(1).max(80).optional(),
  displayName: z.string().trim().min(1).max(120).optional(),
});

router.patch('/me', async (req: Request, res: Response) => {
  const parsed = patchSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Validation failed', details: parsed.error.flatten() } });
  }
  const authUser = req.authUser!;
  const existing = await prisma.customerProfile.findUnique({ where: { userId: authUser.userId } });
  if (!existing) return res.status(404).json({ success: false, error: { code: 'CUSTOMER_NOT_FOUND', message: 'Customer profile not found' } });

  const updated = await prisma.customerProfile.update({
    where: { userId: authUser.userId },
    data: parsed.data,
  });

  try {
    await prisma.auditLog.create({
      data: {
        actorUserId: authUser.userId,
        action: 'CUSTOMER_PROFILE_UPDATED',
        entityType: 'customer_profile',
        entityId: existing.id,
        beforeJson: existing as any,
        afterJson: updated as any,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });
  } catch {}

  return res.json({ success: true, data: updated });
});

export default router;
