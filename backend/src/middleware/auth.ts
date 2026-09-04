import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { prisma } from '../config/prisma';

export interface AuthUser {
  id: string;
  userId: string;
  uuid: string;
  email: string | null;
  roles: string[];
  providerId?: string;
}

declare global {
  namespace Express {
    interface Request {
      authUser?: AuthUser;
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Missing or invalid Authorization header' },
    });
  }
  const token = header.slice(7);
  let payload: { sub: string; uuid: string; email: string | null; roles?: string[]; providerId?: string };
  try {
    payload = jwt.verify(token, env.JWT_SECRET, {
      issuer: 'waasha',
      audience: 'waasha-app',
      algorithms: ['HS256'],
    } as jwt.VerifyOptions) as typeof payload;
  } catch {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Invalid or expired token' },
    });
  }

  // Production: user must exist in DB — no silent fallback on DB error or missing user
  let user: { id: string; status: string } | null;
  try {
    user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, status: true },
    });
  } catch {
    return res.status(503).json({
      success: false,
      error: { code: 'NOT_READY', message: 'Authentication temporarily unavailable' },
    });
  }

  if (!user) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'User no longer exists' },
    });
  }
  if (user.status === 'SUSPENDED' || user.status === 'DELETED' || user.status === 'DEACTIVATED') {
    return res.status(403).json({
      success: false,
      error: { code: 'ACCOUNT_INACTIVE', message: 'Account is not active' },
    });
  }
  if (user.status === 'LOCKED') {
    return res.status(423).json({
      success: false,
      error: { code: 'ACCOUNT_LOCKED', message: 'Account is locked' },
    });
  }

  req.authUser = {
    id: payload.sub,
    userId: payload.sub,
    uuid: payload.uuid ?? payload.sub,
    email: payload.email ?? null,
    roles: payload.roles ?? [],
    providerId: payload.providerId,
  };
  next();
}


