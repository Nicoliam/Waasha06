import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map, catchError, of } from 'rxjs';

export interface AuthUser { id: string; uuid: string; email: string | null; status: string; roles: string[]; customerProfile: any | null; providerProfile: any | null; }
interface AuthResponse { success: boolean; data: any; }
/**
 * Mobile token storage — vertical slice uses localStorage (Capacitor WebView).
 * SECURITY NOTE: Capacitor localStorage is not hardware-secure. Production mobile should use
 * @capacitor/preferences with encryption or capacitor-secure-storage-plugin / Keystore/Keychain
 * for access/refresh tokens, with short-lived JWT and refresh rotation. Different strategy from web
 * (httpOnly cookie) is legitimate due to Capacitor architecture. Current approach acceptable for slice.
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
  private setToken(t: string | null) { try { if (t) localStorage.setItem(TOKEN_KEY, t); else localStorage.removeItem(TOKEN_KEY); } catch {} }
  registerCustomer(payload: { email: string; password: string; firstName?: string; lastName?: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/v1/auth/register/customer', payload).pipe(tap((r: any) => { if (r?.data?.token) this.setToken(r.data.token); }));
  }
  registerProvider(payload: { email: string; password: string; displayName?: string; tierCode: 'T1'|'T2'|'T3'; bio?: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/v1/auth/register/provider', payload).pipe(tap((r: any) => { if (r?.data?.token) this.setToken(r.data.token); }));
  }
  login(payload: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/v1/auth/login', payload).pipe(tap((r: any) => { if (r?.data?.token) this.setToken(r.data.token); }));
  }
  logout(): Observable<any> {
    return this.http.post('/api/v1/auth/logout', {}).pipe(tap(() => { this.setToken(null); this.user$.next(null); }), catchError(() => { this.setToken(null); this.user$.next(null); return of(null); }));
  }
  fetchMe(): Observable<AuthUser | null> {
    if (!this.token()) return of(null);
    return this.http.get<{ success: boolean; data: AuthUser }>('/api/v1/auth/me').pipe(map(r => r.data), tap(u => this.user$.next(u)), catchError(() => { this.user$.next(null); return of(null); }));
  }
  clearLocal(): void { this.setToken(null); this.user$.next(null); }
}
