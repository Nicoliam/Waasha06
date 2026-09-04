import jwt from 'jsonwebtoken';
import { env } from '../../config/env';

export interface JwtPayload {
  sub: string; // users.id
  uuid: string;
  email: string | null;
  roles: string[]; // e.g. ['CUSTOMER','PROVIDER']
  providerId?: string;
  iat?: number;
  exp?: number;
}

export function signAccessToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload as object, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as string & { toString(): string },
    issuer: 'waasha',
    audience: 'waasha-app',
    algorithm: 'HS256',
  } as jwt.SignOptions);
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_SECRET, {
    issuer: 'waasha',
    audience: 'waasha-app',
    algorithms: ['HS256'],
  } as jwt.VerifyOptions) as JwtPayload;
}
