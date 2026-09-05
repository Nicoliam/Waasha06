import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, shareReplay, tap } from 'rxjs';
import {
  FALLBACK_MARKETPLACE_RADIUS_CONFIG,
  MarketplaceRadiusConfig,
  CustomerDiscoveryRadiusKm,
  ProviderCoverageRadiusKm,
} from '../models/discovery-radius.model';

interface MarketplaceConfigApiResponse {
  success: boolean;
  data: {
    default_discovery_radius_km: number;
    max_discovery_radius_km: number;
    allowed_customer_radii_km: number[];
    allowed_provider_coverages_km: number[];
    max_provider_coverage_km: number;
  };
}

@Injectable({ providedIn: 'root' })
export class MarketplaceRadiusConfigService {
  private readonly http = inject(HttpClient);
  private readonly config$ = new BehaviorSubject<MarketplaceRadiusConfig>(FALLBACK_MARKETPLACE_RADIUS_CONFIG);
  private fetched = false;
  private fetch$: Observable<MarketplaceRadiusConfig> | null = null;

  get config(): Observable<MarketplaceRadiusConfig> {
    return this.config$.asObservable();
  }

  snapshot(): MarketplaceRadiusConfig {
    return this.config$.value;
  }

  fetchConfig(): Observable<MarketplaceRadiusConfig> {
    if (this.fetched && this.fetch$) return this.fetch$;
    this.fetch$ = this.http.get<MarketplaceConfigApiResponse>('/api/v1/marketplace/config').pipe(
      map((res) => this.normalize(res)),
      tap((cfg) => {
        this.config$.next(cfg);
        this.fetched = true;
      }),
      catchError(() => {
        this.fetched = true;
        return of(this.config$.value);
      }),
      shareReplay(1),
    );
    return this.fetch$;
  }

  nextCustomerRadius(current: CustomerDiscoveryRadiusKm): CustomerDiscoveryRadiusKm | null {
    const allowed = this.snapshot().allowedCustomerRadiiKm;
    const idx = allowed.indexOf(current);
    if (idx === -1 || idx === allowed.length - 1) return null;
    return allowed[idx + 1];
  }

  canExpand(current: CustomerDiscoveryRadiusKm): boolean {
    return this.nextCustomerRadius(current) !== null;
  }

  isAllowedProviderCoverage(value: number): value is ProviderCoverageRadiusKm {
    return (this.snapshot().allowedProviderCoveragesKm as readonly number[]).includes(value);
  }

  private normalize(res: MarketplaceConfigApiResponse): MarketplaceRadiusConfig {
    const d = res.data;
    const allowedCustomers = (d.allowed_customer_radii_km?.length
      ? d.allowed_customer_radii_km
      : [...FALLBACK_MARKETPLACE_RADIUS_CONFIG.allowedCustomerRadiiKm]) as readonly CustomerDiscoveryRadiusKm[];
    const allowedProviders = (d.allowed_provider_coverages_km?.length
      ? d.allowed_provider_coverages_km
      : [...FALLBACK_MARKETPLACE_RADIUS_CONFIG.allowedProviderCoveragesKm]) as readonly ProviderCoverageRadiusKm[];
    return {
      defaultCustomerRadiusKm: (d.default_discovery_radius_km as CustomerDiscoveryRadiusKm) ?? 10,
      maxCustomerRadiusKm: (d.max_discovery_radius_km as CustomerDiscoveryRadiusKm) ?? 20,
      allowedCustomerRadiiKm: allowedCustomers,
      allowedProviderCoveragesKm: allowedProviders,
      maxProviderCoverageKm: (d.max_provider_coverage_km as ProviderCoverageRadiusKm) ?? 20,
    };
  }
}
