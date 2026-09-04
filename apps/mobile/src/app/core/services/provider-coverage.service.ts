/**
 * Provider Coverage Service — apps/mobile/src/app/core/services/provider-coverage.service.ts
 *
 * Provider selects max service coverage: 10 | 15 | 20 km (max 20).
 * Backend authoritative — client offers picker from backend-allowed values,
 * backend validates on `PUT /providers/me/coverage` etc.
 *
 * No Driver Network — service providers only.
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { ProviderCoverageRadiusKm } from '../models/discovery-radius.model';
import { MarketplaceRadiusConfigService } from '../config/marketplace-radius.config';

interface ProviderCoverageApiResponse {
  success: boolean;
  data: { coverageRadiusKm: number; updatedAt?: string };
}

@Injectable({ providedIn: 'root' })
export class ProviderCoverageService {
  private readonly http = inject(HttpClient);
  private readonly radiusConfig = inject(MarketplaceRadiusConfigService);

  /** Allowed picker options — from backend config (not hard-coded security). */
  allowedCoverages(): readonly ProviderCoverageRadiusKm[] {
    return this.radiusConfig.snapshot().allowedProviderCoveragesKm;
  }

  /** Fetch provider's current coverage. */
  fetchMyCoverage(): Observable<ProviderCoverageRadiusKm> {
    return this.http
      .get<ProviderCoverageApiResponse>('/api/v1/providers/me/coverage')
      .pipe(map((res) => res.data.coverageRadiusKm as ProviderCoverageRadiusKm));
  }

  /**
   * Update provider coverage — backend validates value ∈ {10,15,20} and ≤ max.
   * Client does not enforce as security boundary; backend returns 422 on invalid.
   */
  updateMyCoverage(radiusKm: ProviderCoverageRadiusKm): Observable<ProviderCoverageRadiusKm> {
    return this.http
      .put<ProviderCoverageApiResponse>('/api/v1/providers/me/coverage', { coverageRadiusKm: radiusKm })
      .pipe(map((res) => res.data.coverageRadiusKm as ProviderCoverageRadiusKm));
  }

  /**
   * UX helper: label for coverage option.
   */
  label(radius: ProviderCoverageRadiusKm): string {
    return `${radius} km coverage`;
  }
}
