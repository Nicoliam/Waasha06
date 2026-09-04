import bcrypt from 'bcryptjs';

const BCRYPT_ROUNDS = 12;

/**
 * Password validation — blueprint §11: configurable, not overly strict but must block weak passwords.
 * Policy: 8–128 chars, at least one uppercase, one lowercase, one digit.
 * Rejects common trivial passwords via blacklist.
 */
const COMMON_WEAK = new Set([
  'password',
  'password123',
  '12345678',
  'qwerty123',
  'admin123',
  'waasha123',
]);

export function validatePasswordStrength(password: string): { valid: boolean; reason?: string } {
  if (password.length < 8) return { valid: false, reason: 'Password must be at least 8 characters' };
  if (password.length > 128) return { valid: false, reason: 'Password must be at most 128 characters' };
  if (!/[a-z]/.test(password)) return { valid: false, reason: 'Password must contain a lowercase letter' };
  if (!/[A-Z]/.test(password)) return { valid: false, reason: 'Password must contain an uppercase letter' };
  if (!/[0-9]/.test(password)) return { valid: false, reason: 'Password must contain a digit' };
  if (COMMON_WEAK.has(password.toLowerCase())) return { valid: false, reason: 'Password is too common' };
  return { valid: true };
}

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, BCRYPT_ROUNDS);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
