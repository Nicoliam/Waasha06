import { Router, Request, Response, NextFunction } from 'express';
import { customerRegisterSchema, providerRegisterSchema, loginSchema } from './auth.schemas';
import { registerCustomer, registerProvider, login, getMe } from './auth.service';
import { authMiddleware } from '../../middleware/auth';
import { registerLimiter, loginLimiter, isBruteBlocked, recordFailedLogin, clearFailedLogin } from '../../middleware/rateLimit';
import { prisma } from '../../config/prisma';

const router = Router();

// POST /api/v1/auth/register/customer
router.post('/register/customer', registerLimiter, async (req: Request, res: Response, next: NextFunction) => {
  const parsed = customerRegisterSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Validation failed', details: parsed.error.flatten() } });
  }
  // Mass-assignment protection: explicitly allowlist fields; ignore role/tier/admin flags from client
  const { email, password, firstName, lastName, displayName } = parsed.data;
  try {
    const result = await registerCustomer({
      email,
      password,
      firstName,
      lastName,
      displayName,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });
    return res.status(201).json({ success: true, data: result });
  } catch (err: any) {
    if (err.status) return res.status(err.status).json({ success: false, error: { code: err.code ?? 'ERROR', message: err.message } });
    return next(err);
  }
});

// POST /api/v1/auth/register/provider
router.post('/register/provider', registerLimiter, async (req: Request, res: Response, next: NextFunction) => {
  const parsed = providerRegisterSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Validation failed', details: parsed.error.flatten() } });
  }
  const { email, password, displayName, tierCode, bio } = parsed.data;
  try {
    const result = await registerProvider({
      email,
      password,
      displayName,
      tierCode,
      bio,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });
    return res.status(201).json({ success: true, data: result });
  } catch (err: any) {
    if (err.status) return res.status(err.status).json({ success: false, error: { code: err.code ?? 'ERROR', message: err.message } });
    return next(err);
  }
});

// POST /api/v1/auth/login — with brute-force guard + rate limiter
router.post('/login', loginLimiter, async (req: Request, res: Response, next: NextFunction) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Validation failed', details: parsed.error.flatten() } });
  }
  const emailKey = parsed.data.email.toLowerCase().trim();
  const bruteKey = `${req.ip ?? 'unknown'}:${emailKey}`;
  if (isBruteBlocked(bruteKey)) {
    return res.status(429).json({ success: false, error: { code: 'RATE_LIMITED', message: 'Too many failed login attempts. Try again later.' } });
  }
  try {
    const result = await login({
      email: parsed.data.email,
      password: parsed.data.password,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });
    clearFailedLogin(bruteKey);
    return res.json({ success: true, data: result });
  } catch (err: any) {
    // Record brute-force failure even for 401 to throttle guessing
    if (err.status === 401 || err.code === 'INVALID_CREDENTIALS') recordFailedLogin(bruteKey);
    if (err.status) return res.status(err.status).json({ success: false, error: { code: err.code ?? 'ERROR', message: err.message } });
    return next(err);
  }
});

// POST /api/v1/auth/logout — stateless JWT: audit + client discards token. Requires auth.
router.post('/logout', authMiddleware, async (req: Request, res: Response) => {
  try {
    await prisma.auditLog.create({
      data: {
        actorUserId: req.authUser!.userId,
        action: 'LOGOUT',
        entityType: 'user',
        entityId: req.authUser!.userId,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });
  } catch {}
  return res.json({ success: true, data: { message: 'Logged out' } });
});

// GET /api/v1/auth/me — authenticated profile
router.get('/me', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getMe(req.authUser!.userId);
    return res.json({ success: true, data });
  } catch (err: any) {
    if (err.status) return res.status(err.status).json({ success: false, error: { code: err.code ?? 'ERROR', message: err.message } });
    return next(err);
  }
});

// GET /api/v1/auth/me/roles — helper for role debugging (convenience)
router.get('/me/roles', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getMe(req.authUser!.userId);
    return res.json({ success: true, data: { roles: data.roles, providerProfile: data.providerProfile ? { tierCode: (data.providerProfile as any).tier?.code } : null } });
  } catch (err: any) {
    if (err.status) return res.status(err.status).json({ success: false, error: { code: err.code ?? 'ERROR', message: err.message } });
    return next(err);
  }
});

export default router;
