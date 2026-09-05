import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerLocation } from '../models/discovery-radius.model';

const STORAGE_KEY = 'waasha_customer_location';
const DEFAULT_LOCATION: CustomerLocation = { latitude: -26.2041, longitude: 28.0473 }; // Sandton, Johannesburg

@Injectable({ providedIn: 'root' })
export class CustomerLocationService {
  private readonly _loc$ = new BehaviorSubject<CustomerLocation>(this.loadInitial());
  readonly location$ = this._loc$.asObservable();

  get snapshot(): CustomerLocation {
    return this._loc$.value;
  }

  setLocation(loc: CustomerLocation): void {
    this._loc$.next(loc);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
    } catch {}
  }

  tryUseBrowserGeolocation(): Promise<CustomerLocation> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc: CustomerLocation = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
          this.setLocation(loc);
          resolve(loc);
        },
        (err) => reject(err),
        { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
      );
    });
  }

  private loadInitial(): CustomerLocation {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Number.isFinite(parsed.latitude) && Number.isFinite(parsed.longitude)) {
          return { latitude: parsed.latitude, longitude: parsed.longitude };
        }
      }
    } catch {}
    return DEFAULT_LOCATION;
  }

  label(loc?: CustomerLocation): string {
    const l = loc ?? this.snapshot;
    // Friendly label — never expose precise coords in UI beyond distance
    if (Math.abs(l.latitude - DEFAULT_LOCATION.latitude) < 0.01 && Math.abs(l.longitude - DEFAULT_LOCATION.longitude) < 0.01) {
      return 'Sandton, Johannesburg';
    }
    return `${l.latitude.toFixed(3)}, ${l.longitude.toFixed(3)}`;
  }
}
