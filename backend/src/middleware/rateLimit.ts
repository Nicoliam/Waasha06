import rateLimit from 'express-rate-limit';

/**
 * Auth rate limiters — blueprint §44, §45: stricter limits for sensitive endpoints.
 * In-memory store: sufficient for single-instance vertical slice.
 * PRODUCTION NOTE: in-memory bruteMap and express-rate-limit MemoryStore do NOT share state
 * across instances. For multi-instance production, replace with Redis store (e.g. rate-limit-redis)
 * and a distributed brute-force counter. Until then, each instance enforces limits independently.
 */

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { code: 'RATE_LIMITED', message: 'Too many registration attempts. Try again later.' } },
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { code: 'RATE_LIMITED', message: 'Too many login attempts. Try again later.' } },
  keyGenerator: (req) => {
    // Combine IP + email to avoid locking out unrelated users sharing IP, but still throttle IP without email
    const email = (req.body?.email as string | undefined)?.toLowerCase()?.trim() ?? '';
    const ip = req.ip ?? 'unknown';
    return email ? `${ip}:${email}` : ip;
  },
});

/**
 * Brute-force guard — in-memory failed-login counter.
 * After 5 failures within 15 min for IP:email key, returns 429 for 15 min.
 * Prevents unlimited password guessing beyond per-IP rate limit.
 * PRODUCTION: must be replaced with Redis/distributed store for horizontal scaling.
 */
const bruteMap = new Map<string, { count: number; firstAt: number }>();
const BRUTE_WINDOW_MS = 15 * 60 * 1000;
const BRUTE_MAX = 5;

export function isBruteBlocked(key: string): boolean {
  const rec = bruteMap.get(key);
  if (!rec) return false;
  if (Date.now() - rec.firstAt > BRUTE_WINDOW_MS) {
    bruteMap.delete(key);
    return false;
  }
  return rec.count >= BRUTE_MAX;
}

export function recordFailedLogin(key: string) {
  const now = Date.now();
  const rec = bruteMap.get(key);
  if (!rec || now - rec.firstAt > BRUTE_WINDOW_MS) {
    bruteMap.set(key, { count: 1, firstAt: now });
  } else {
    rec.count += 1;
  }
}

export function clearFailedLogin(key: string) {
  bruteMap.delete(key);
}

// For tests: reset brute map
export function _resetBruteMap() {
  bruteMap.clear();
}
