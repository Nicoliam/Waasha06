import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map, catchError, of } from 'rxjs';

export interface AuthUser {
  id: string;
  uuid: string;
  email: string | null;
  status: string;
  roles: string[];
  customerProfile: any | null;
  providerProfile: any | null;
}

interface AuthResponse {
  success: boolean;
  data: { user: AuthUser; token: string } | AuthUser;
}

/**
 * Token storage — vertical-slice implementation uses localStorage.
 * SECURITY NOTE (blueprint Document 08 §16-18): browser storage is vulnerable to XSS.
 * Production web should use httpOnly, Secure, SameSite=Strict cookies for access/refresh tokens,
 * with CSRF protection. Current localStorage is acceptable for this slice but XSS risk must be closed
 * before production hardening (CSP, sanitize, no inline scripts).
 */
const TOKEN_KEY = 'waasha_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private user$ = new BehaviorSubject<AuthUser | null>(null);

  get user(): Observable<AuthUser | null> { return this.user$.asObservable(); }
  snapshot(): AuthUser | null { return this.user$.value; }
  isAuthenticated(): boolean { return !!this.token(); }
  token(): string | null { try { return localStorage.getItem(TOKEN_KEY); } catch { return null; } }

  private setToken(t: string | null) {
    try {
      if (t) localStorage.setItem(TOKEN_KEY, t);
      else localStorage.removeItem(TOKEN_KEY);
    } catch {}
  }

  registerCustomer(payload: { email: string; password: string; firstName?: string; lastName?: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/v1/auth/register/customer', payload).pipe(
      tap((res) => { const d: any = res.data; if (d?.token) this.setToken(d.token); }),
    );
  }

  registerProvider(payload: { email: string; password: string; displayName?: string; tierCode: 'T1'|'T2'|'T3'; bio?: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/v1/auth/register/provider', payload).pipe(
      tap((res) => { const d: any = res.data; if (d?.token) this.setToken(d.token); }),
    );
  }

  login(payload: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/v1/auth/login', payload).pipe(
      tap((res) => { const d: any = res.data; if (d?.token) this.setToken(d.token); }),
    );
  }

  logout(): Observable<any> {
    return this.http.post('/api/v1/auth/logout', {}).pipe(
      tap(() => { this.setToken(null); this.user$.next(null); }),
      catchError(() => { this.setToken(null); this.user$.next(null); return of(null); }),
    );
  }

  fetchMe(): Observable<AuthUser | null> {
    if (!this.token()) return of(null);
    return this.http.get<{ success: boolean; data: AuthUser }>('/api/v1/auth/me').pipe(
      map((r) => r.data),
      tap((u) => this.user$.next(u)),
      catchError(() => { this.user$.next(null); return of(null); }),
    );
  }

  clearLocal(): void { this.setToken(null); this.user$.next(null); }
}
