import { Injectable } from '@angular/core';
import {
  CustomerDiscoveryRadiusKm,
  ProviderCoverageRadiusKm,
  MarketplaceEligibility,
} from '../models/discovery-radius.model';

@Injectable({ providedIn: 'root' })
export class MarketplaceEligibilityService {
  haversineKm(a: { latitude: number; longitude: number }, b: { latitude: number; longitude: number }): number {
    const R = 6371;
    const dLat = this.rad(b.latitude - a.latitude);
    const dLon = this.rad(b.longitude - a.longitude);
    const lat1 = this.rad(a.latitude);
    const lat2 = this.rad(b.latitude);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  private rad(d: number): number {
    return (d * Math.PI) / 180;
  }

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

  checkByLocations(
    customer: { latitude: number; longitude: number },
    provider: { latitude: number; longitude: number; coverageRadiusKm: ProviderCoverageRadiusKm },
    customerRadiusKm: CustomerDiscoveryRadiusKm,
  ): MarketplaceEligibility {
    const d = this.haversineKm(customer, provider);
    return this.checkEligibility(d, customerRadiusKm, provider.coverageRadiusKm);
  }
}
