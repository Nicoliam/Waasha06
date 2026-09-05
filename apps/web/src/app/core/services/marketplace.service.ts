import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProviderProfileDto } from '../models/discovery-radius.model';

interface ProviderProfileApiResponse {
  success: boolean;
  data: ProviderProfileDto;
}

@Injectable({ providedIn: 'root' })
export class MarketplaceService {
  private readonly http = inject(HttpClient);

  fetchProviderProfile(providerId: string, customerLoc?: { latitude: number; longitude: number }): Observable<ProviderProfileApiResponse> {
    let params = new HttpParams();
    if (customerLoc) {
      params = params.set('latitude', String(customerLoc.latitude)).set('longitude', String(customerLoc.longitude));
    }
    return this.http.get<ProviderProfileApiResponse>(`/api/v1/marketplace/providers/${encodeURIComponent(providerId)}`, { params });
  }
}
