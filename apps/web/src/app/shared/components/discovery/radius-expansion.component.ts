import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDiscoveryRadiusKm } from '../../../core/models/discovery-radius.model';

@Component({
  selector: 'waasha-radius-expansion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="total === 0"
      class="wa-empty"
      role="status"
      aria-live="polite"
    >
      <p class="wa-empty__title">
        {{ titleForRadius }}
      </p>
      <p class="wa-empty__sub" *ngIf="canExpandTo">
        Try expanding your discovery radius.
      </p>
      <p class="wa-empty__sub" *ngIf="!canExpandTo">
        You've reached the maximum discovery radius ({{ currentRadiusKm }} km). Try changing category or location.
      </p>

      <button
        *ngIf="canExpandTo"
        type="button"
        (click)="expand.emit(canExpandTo)"
        class="wa-btn wa-btn-primary wa-btn--navy wa-empty__cta"
        [attr.aria-label]="'Expand discovery radius to ' + canExpandTo + ' km'"
      >
        Search within {{ canExpandTo }} km
      </button>

      <div *ngIf="canExpandTo" class="wa-empty__footnote">
        Maximum: {{ maxRadiusKm }} km • Provider coverage also applies
      </div>
    </div>
  `,
  styles: [`
    .wa-empty { border: 1px solid var(--waasha-border); background: white; border-radius: var(--waasha-radius); padding: 20px; text-align: center; box-shadow: 0 1px 2px rgba(16,24,40,0.04); }
    .wa-empty__title { font-size: 14px; font-weight: 800; color: var(--waasha-navy); margin: 0; }
    .wa-empty__sub { font-size: 13px; color: var(--waasha-muted); margin: 6px 0 0; }
    .wa-empty__cta { margin-top: 12px; border-radius: 12px; padding: 10px 18px; }
    .wa-btn--navy { background: var(--waasha-navy); }
    .wa-empty__footnote { margin-top: 8px; font-size: 11px; color: var(--waasha-muted); }
  `]
})
export class RadiusExpansionComponent {
  @Input({ required: true }) currentRadiusKm!: CustomerDiscoveryRadiusKm;
  @Input() canExpandTo: CustomerDiscoveryRadiusKm | null = null;
  @Input() maxRadiusKm: CustomerDiscoveryRadiusKm = 20;
  @Input() total: number | null = null;

  @Output() expand = new EventEmitter<CustomerDiscoveryRadiusKm>();

  get titleForRadius(): string {
    if (this.currentRadiusKm === 10) return 'No providers found within 10 km.';
    if (this.currentRadiusKm === 15) return 'Still no providers nearby.';
    return "Looks like there aren't any available providers nearby yet.";
  }
}
