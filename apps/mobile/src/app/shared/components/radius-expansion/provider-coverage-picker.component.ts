/**
 * Provider Coverage Picker — apps/mobile/src/app/shared/components/radius-expansion/provider-coverage-picker.component.ts
 *
 * Provider chooses service coverage: 10 | 15 | 20 km (max 20).
 * Options rendered from backend-provided MarketplaceRadiusConfigService.
 * Backend validates on save.
 */

import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProviderCoverageRadiusKm } from '../../../core/models/discovery-radius.model';
import { MarketplaceRadiusConfigService } from '../../../core/config/marketplace-radius.config';

@Component({
  selector: 'waasha-provider-coverage-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <fieldset class="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
      <legend class="px-1 text-sm font-bold text-[#0B1F33]">Service coverage radius</legend>
      <p class="mb-3 text-xs text-[#667085]">
        Customers beyond this distance won't see your services — even if they search a larger
        radius. Maximum 20 km.
      </p>
      <div class="grid grid-cols-3 gap-2">
        <label
          *ngFor="let opt of options"
          class="flex cursor-pointer flex-col items-center rounded-xl border px-3 py-3 text-center"
          [class.border-[#19B6A5]]="value === opt"
          [class.bg-[#E6F7F5]]="value === opt"
          [class.border-[#E2E8F0]]="value !== opt"
        >
          <input
            type="radio"
            name="coverage"
            [value]="opt"
            [checked]="value === opt"
            (change)="valueChange.emit(opt)"
            class="sr-only"
          />
          <span class="text-sm font-bold text-[#0B1F33]">{{ opt }} km</span>
          <span class="text-xs text-[#667085]">{{ label(opt) }}</span>
        </label>
      </div>
    </fieldset>
  `,
})
export class ProviderCoveragePickerComponent {
  private readonly config = inject(MarketplaceRadiusConfigService);

  @Input() value: ProviderCoverageRadiusKm = 10;
  @Output() valueChange = new EventEmitter<ProviderCoverageRadiusKm>();

  get options(): readonly ProviderCoverageRadiusKm[] {
    return this.config.snapshot().allowedProviderCoveragesKm;
  }

  label(r: ProviderCoverageRadiusKm): string {
    if (r === 10) return 'Default';
    if (r === 15) return 'Extended';
    return 'Maximum';
  }
}
