/**
 * Radius Expansion Component — apps/mobile/src/app/shared/components/radius-expansion/radius-expansion.component.ts
 *
 * Empty-results UX: "No providers within 10 km → Expand to 15 km → Expand to 20 km → Max reached"
 * Renders options from backend-provided config (MarketplaceRadiusConfigService).
 * No hard-coded max enforcement as security — backend validates.
 */

import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDiscoveryRadiusKm } from '../../../core/models/discovery-radius.model';

@Component({
  selector: 'waasha-radius-expansion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="total === 0"
      class="rounded-xl border border-[#E2E8F0] bg-white p-4 text-center shadow-sm"
      role="status"
      aria-live="polite"
    >
      <p class="text-sm font-semibold text-[#0B1F33]">
        No services found within {{ currentRadiusKm }} km.
      </p>
      <p class="mt-1 text-sm text-[#667085]" *ngIf="canExpandTo">
        Try expanding your discovery radius.
      </p>
      <p class="mt-1 text-sm text-[#667085]" *ngIf="!canExpandTo">
        You've reached the maximum discovery radius ({{ currentRadiusKm }} km). Try changing
        category or location.
      </p>

      <button
        *ngIf="canExpandTo"
        type="button"
        (click)="expand.emit(canExpandTo)"
        class="mt-3 inline-flex items-center justify-center rounded-xl bg-[#0B1F33] px-4 py-2.5 text-sm font-bold text-white shadow-sm active:scale-[0.98]"
        [attr.aria-label]="'Expand discovery radius to ' + canExpandTo + ' km'"
      >
        Expand to {{ canExpandTo }} km
      </button>

      <div *ngIf="canExpandTo" class="mt-2 text-xs text-[#667085]">
        Maximum: {{ maxRadiusKm }} km • Provider coverage also applies
      </div>
    </div>
  `,
})
export class RadiusExpansionComponent {
  /** Current customer radius (from DiscoveryService). */
  @Input({ required: true }) currentRadiusKm!: CustomerDiscoveryRadiusKm;
  /** Next allowed radius, or null at max — derived from backend config. */
  @Input() canExpandTo: CustomerDiscoveryRadiusKm | null = null;
  @Input() maxRadiusKm: CustomerDiscoveryRadiusKm = 20;
  @Input() total: number | null = null;

  @Output() expand = new EventEmitter<CustomerDiscoveryRadiusKm>();
}
