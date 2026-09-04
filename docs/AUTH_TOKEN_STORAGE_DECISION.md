# Waasha Auth Token Storage — Security Decision (Vertical Slice)

**Date:** 2026-09-04
**Scope:** Authentication vertical slice only
**Blueprint ref:** Document 08 §16-18 (Session Architecture, Access/Refresh Tokens)

## Decision
- **Web (`apps/web`):** Store JWT access token in `localStorage` (`waasha_token`) for this slice.
- **Mobile (`apps/mobile`, Capacitor):** Store JWT in `localStorage` (WebView) for this slice.

## Why this is acceptable now
- Vertical slice goal is end-to-end auth correctness, not final hardening.
- Both apps consume real API via `Authorization: Bearer` interceptor.
- JWT is short-lived (1h, `JWT_EXPIRES_IN` configurable) and verification enforces `issuer=waasha`, `audience=waasha-app`, expiry, signature, and DB-backed user existence/status.
- Allows rapid iteration without cookie/CORS complexity.

## Risks
- **XSS token theft:** `localStorage` is accessible to any JS running in origin. A successful XSS exfiltrates the token.
- **No httpOnly protection:** Unlike cookies, token is not shielded from JS.
- **No refresh rotation yet:** Stolen token valid until expiry. No revocation list.
- **Capacitor:** WebView `localStorage` is not hardware-backed secure storage; device extraction easier.

## Production target (post-slice)
| Platform | Target storage | Details |
|---|---|---|
| Web | `httpOnly`, `Secure`, `SameSite=Strict` cookies | Access token short-lived (15m), refresh token rotation with reuse detection, CSRF protection via SameSite + anti-CSRF token for cookie-auth endpoints. Avoid `localStorage` for tokens. |
| Mobile (Capacitor) | Secure Storage plugin (Keychain/Keystore) | `@capacitor/secure-storage` or `capacitor-secure-storage-plugin`, encrypted at rest, short-lived JWT + refresh rotation, biometric where appropriate. |

Mobile and web legitimately differ: web uses cookie httpOnly, mobile uses OS secure storage — both satisfy blueprint requirement for “secure platform storage appropriate to the client”.

## Mitigations applied now
- `helmet`, CORS allowlist, 1MB JSON limit, bcrypt cost 12, JWT issuer/audience enforced, DB user existence check (no silent fallback), rate limits + brute-force 5/15m, audit without secrets.
- Frontend normalizes email, validates password strength client+server, never logs token/password.

## Remaining hardening before production
1. Replace `localStorage` with httpOnly cookies (web) + secure storage (mobile).
2. Implement refresh token rotation + revocation.
3. Add CSP headers, XSS sanitization, strict cookie flags.
4. Move rate-limit/brute-force maps to Redis for multi-instance.
5. Add session list + revoke-all.

**Status:** Accepted for slice with documented risk. Must be closed before production launch.
