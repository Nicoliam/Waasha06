import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  CustomerDiscoveryRadiusKm,
  MarketplaceProvidersQuery,
  RadiusExpansionState,
  ProviderCardDto,
  ServiceCategory,
} from '../models/discovery-radius.model';
import { MarketplaceRadiusConfigService } from '../config/marketplace-radius.config';

interface MarketplaceProvidersApiResponse {
  success: boolean;
  data: ProviderCardDto[];
  meta: { page: number; perPage: number; total: number; radiusKm: number };
}

interface CategoriesApiResponse {
  success: boolean;
  data: ServiceCategory[];
}

@Injectable({ providedIn: 'root' })
export class DiscoveryService {
  private readonly http = inject(HttpClient);
  private readonly radiusConfig = inject(MarketplaceRadiusConfigService);

  private readonly _radius$ = new BehaviorSubject<CustomerDiscoveryRadiusKm>(10);
  readonly radius$ = this._radius$.asObservable();

  get currentRadius(): CustomerDiscoveryRadiusKm {
    return this._radius$.value;
  }

  initFromConfig(): void {
    const cfg = this.radiusConfig.snapshot();
    this._radius$.next(cfg.defaultCustomerRadiusKm);
    this.radiusConfig.fetchConfig().subscribe((fresh) => {
      if (this._radius$.value === FALLBACK_PLACEHOLDER) {
        this._radius$.next(fresh.defaultCustomerRadiusKm);
      }
    });
  }

  setRadius(radius: CustomerDiscoveryRadiusKm): void {
    this._radius$.next(radius);
  }

  expansionState(): RadiusExpansionState {
    const current = this.currentRadius;
    const canExpandTo = this.radiusConfig.nextCustomerRadius(current);
    return { currentRadiusKm: current, canExpandTo, atMax: canExpandTo === null };
  }

  canExpand(): boolean {
    return this.radiusConfig.canExpand(this.currentRadius);
  }

  expand(): CustomerDiscoveryRadiusKm {
    const next = this.radiusConfig.nextCustomerRadius(this.currentRadius);
    if (next !== null) this._radius$.next(next);
    return this.currentRadius;
  }

  resetToDefault(): void {
    this._radius$.next(this.radiusConfig.snapshot().defaultCustomerRadiusKm);
  }

  fetchProviders(query: MarketplaceProvidersQuery): Observable<MarketplaceProvidersApiResponse> {
    let params = new HttpParams()
      .set('latitude', String(query.latitude))
      .set('longitude', String(query.longitude))
      .set('radiusKm', String(query.radiusKm));
    if (query.categoryId) params = params.set('categoryId', query.categoryId);
    if (query.page) params = params.set('page', String(query.page));
    if (query.perPage) params = params.set('perPage', String(query.perPage));
    return this.http.get<MarketplaceProvidersApiResponse>('/api/v1/marketplace/providers', { params });
  }

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

  fetchCategories(): Observable<CategoriesApiResponse> {
    return this.http.get<CategoriesApiResponse>('/api/v1/marketplace/categories');
  }

  nextRadiusLabel(): string | null {
    const next = this.radiusConfig.nextCustomerRadius(this.currentRadius);
    return next ? `Expand to ${next} km` : null;
  }
}

const FALLBACK_PLACEHOLDER: CustomerDiscoveryRadiusKm = 10;
