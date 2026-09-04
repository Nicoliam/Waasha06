/**
 * Marketplace Eligibility Service — apps/mobile/src/app/core/services/marketplace-eligibility.service.ts
 *
 * Implements dual-radius eligibility rule for CLIENT-SIDE UX PREVIEW ONLY.
 * Backend is authoritative for marketplace eligibility and radius validation.
 *
 * Rule (from task):
 *  provider eligible iff distance ≤ customerRadius AND distance ≤ providerCoverage
 *  Example: 12 km / provider 10 km → ineligible even at 15/20 km customer radius
 */

import { Injectable } from '@angular/core';
import {
  CustomerDiscoveryRadiusKm,
  ProviderCoverageRadiusKm,
  MarketplaceEligibility,
} from '../models/discovery-radius.model';

@Injectable({ providedIn: 'root' })
export class MarketplaceEligibilityService {
  /**
   * Haversine distance (km) — used for preview; backend uses geospatial index as source of truth.
   */
  haversineKm(
    a: { latitude: number; longitude: number },
    b: { latitude: number; longitude: number },
  ): number {
    const R = 6371;
    const dLat = this.rad(b.latitude - a.latitude);
    const dLon = this.rad(b.longitude - a.longitude);
    const lat1 = this.rad(a.latitude);
    const lat2 = this.rad(b.latitude);
    const h =
      Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  private rad(d: number): number {
    return (d * Math.PI) / 180;
  }

  /**
   * Client-side eligibility preview — mirrors backend BOTH check.
   * Do NOT use as security boundary; backend validates and filters.
   */
  checkEligibility(
    distanceKm: number,
    customerRadiusKm: CustomerDiscoveryRadiusKm,
    providerCoverageKm: ProviderCoverageRadiusKm,
  ): MarketplaceEligibility {
    const withinCustomerRadius = distanceKm <= customerRadiusKm;
    const withinProviderCoverage = distanceKm <= providerCoverageKm;
    const eligible = withinCustomerRadius && withinProviderCoverage;

    let reason: string | undefined;
    if (!eligible) {
      if (!withinProviderCoverage && !withinCustomerRadius) {
        reason = `Distance ${distanceKm.toFixed(1)} km exceeds both customer ${customerRadiusKm} km and provider ${providerCoverageKm} km limits`;
      } else if (!withinProviderCoverage) {
        reason = `Outside provider coverage (${providerCoverageKm} km)`;
      } else {
        reason = `Outside customer discovery radius (${customerRadiusKm} km)`;
      }
    }

    return {
      distanceKm,
      customerRadiusKm,
      providerCoverageKm,
      withinCustomerRadius,
      withinProviderCoverage,
      eligible,
      reason,
    };
  }

  /**
   * Convenience: compute distance then check eligibility.
   */
  checkByLocations(
    customer: { latitude: number; longitude: number },
    provider: { latitude: number; longitude: number; coverageRadiusKm: ProviderCoverageRadiusKm },
    customerRadiusKm: CustomerDiscoveryRadiusKm,
  ): MarketplaceEligibility {
    const d = this.haversineKm(customer, provider);
    return this.checkEligibility(d, customerRadiusKm, provider.coverageRadiusKm);
  }
}
