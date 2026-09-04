import { Request, Response, NextFunction } from 'express';

/**
 * Require authenticated — ensures authMiddleware ran.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.authUser) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } });
  }
  next();
}

/**
 * Require role — checks req.authUser.roles includes at least one allowed role.
 * Use after authMiddleware. Returns 403 if role missing.
 */
export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authUser = req.authUser;
    if (!authUser) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } });
    }
    // Roles may be empty before token enrichment; fetch is fallback — but prefer token.roles
    const roles = (authUser as any).roles ?? [];
    // If token has no roles field (legacy tokens in tests), allow if providerId present for provider-only checks?
    // For strictness, require explicit match.
    const has = roles.some((r: string) => allowedRoles.includes(r));
    if (!has) {
      // For backward compatibility: radius tests use tokens with only sub + providerId — allow those for provider endpoints only
      // This middleware is only used for explicit role-gated routes; radius routes already use authMiddleware directly.
      return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } });
    }
    next();
  };
}
