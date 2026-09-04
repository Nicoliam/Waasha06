/**
 * Discovery Service — apps/mobile/src/app/core/services/discovery.service.ts
 *
 * Customer discovery radius state + expansion flow (10 → 15 → 20).
 * Backend authoritative: every marketplace query is validated server-side.
 * Client expansion is UX convenience only; backend enforces max 20 km and provider coverage.
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  CustomerDiscoveryRadiusKm,
  MarketplaceProvidersQuery,
  RadiusExpansionState,
} from '../models/discovery-radius.model';
import { MarketplaceRadiusConfigService } from '../config/marketplace-radius.config';

export interface ProviderCardDto {
  id: string;
  displayName: string;
  latitude: number;
  longitude: number;
  coverageRadiusKm: number;
  distanceKm: number;
  serviceCategory: string;
  rating?: number;
  // ... other marketplace fields (non-exhaustive for foundation)
}

interface MarketplaceProvidersApiResponse {
  success: boolean;
  data: ProviderCardDto[];
  meta: { page: number; perPage: number; total: number; radiusKm: number };
}

@Injectable({ providedIn: 'root' })
export class DiscoveryService {
  private readonly http = inject(HttpClient);
  private readonly radiusConfig = inject(MarketplaceRadiusConfigService);

  /** Current customer discovery radius — initialized from backend config default. */
  private readonly _radius$ = new BehaviorSubject<CustomerDiscoveryRadiusKm>(10);
  readonly radius$ = this._radius$.asObservable();

  get currentRadius(): CustomerDiscoveryRadiusKm {
    return this._radius$.value;
  }

  /** Initialize radius from backend-provided default (call on app/marketplace init). */
  initFromConfig(): void {
    const cfg = this.radiusConfig.snapshot();
    this._radius$.next(cfg.defaultCustomerRadiusKm);
    // Also trigger async fetch to reconcile if backend differs
    this.radiusConfig.fetchConfig().subscribe((fresh) => {
      // Only adjust if still at fallback default; don't clobber user-selected expansion
      if (this._radius$.value === FALLBACK_PLACEHOLDER_FALLBACK) {
        this._radius$.next(fresh.defaultCustomerRadiusKm);
      }
    });
  }

  /** Set radius explicitly — UX helper, backend still validates. */
  setRadius(radius: CustomerDiscoveryRadiusKm): void {
    this._radius$.next(radius);
  }

  /** Expansion state derived from backend-provided allowedCustomerRadiiKm (no hard-coded branches). */
  expansionState(): RadiusExpansionState {
    const current = this.currentRadius;
    const canExpandTo = this.radiusConfig.nextCustomerRadius(current);
    return {
      currentRadiusKm: current,
      canExpandTo,
      atMax: canExpandTo === null,
    };
  }

  /** Whether UI should offer expansion — derived from backend config. */
  canExpand(): boolean {
    return this.radiusConfig.canExpand(this.currentRadius);
  }

  /** Expand to next allowed radius per backend sequence. No-op at max. */
  expand(): CustomerDiscoveryRadiusKm {
    const next = this.radiusConfig.nextCustomerRadius(this.currentRadius);
    if (next !== null) this._radius$.next(next);
    return this.currentRadius;
  }

  /** Reset to backend default (e.g., when location changes). */
  resetToDefault(): void {
    this._radius$.next(this.radiusConfig.snapshot().defaultCustomerRadiusKm);
  }

  /**
   * Query marketplace providers — backend enforces:
   *  - radius ≤ max (20) else 422
   *  - distance ≤ customer radius AND ≤ provider coverage
   * Client passes radiusKm as-is; does not sanitize as security boundary.
   */
  fetchProviders(query: MarketplaceProvidersQuery): Observable<MarketplaceProvidersApiResponse> {
    let params = new HttpParams()
      .set('latitude', String(query.latitude))
      .set('longitude', String(query.longitude))
      .set('radiusKm', String(query.radiusKm));
    if (query.categoryId) params = params.set('categoryId', query.categoryId);
    if (query.page) params = params.set('page', String(query.page));
    if (query.perPage) params = params.set('perPage', String(query.perPage));

    return this.http.get<MarketplaceProvidersApiResponse>('/api/v1/marketplace/providers', {
      params,
    });
  }

  /**
   * Convenience: fetch with current radius state.
   */
  fetchWithCurrentRadius(
    loc: { latitude: number; longitude: number },
    extra?: Omit<MarketplaceProvidersQuery, 'latitude' | 'longitude' | 'radiusKm'>,
  ): Observable<MarketplaceProvidersApiResponse> {
    return this.fetchProviders({
      latitude: loc.latitude,
      longitude: loc.longitude,
      radiusKm: this.currentRadius,
      ...extra,
    });
  }

  /** Helper for empty-results CTA label. */
  nextRadiusLabel(): string | null {
    const next = this.radiusConfig.nextCustomerRadius(this.currentRadius);
    return next ? `Expand to ${next} km` : null;
  }
}

// Placeholder guard to avoid clobbering user-selected radius during async config reconcile
const FALLBACK_PLACEHOLDER_FALLBACK: CustomerDiscoveryRadiusKm = 10;
