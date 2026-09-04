/**
 * Discovery Page (foundation) — apps/mobile/src/app/features/discovery/discovery.page.ts
 *
 * Demonstrates dual-radius usage:
 * - Customer radius state via DiscoveryService (10 → 15 → 20)
 * - Backend-authoritative query via GET /marketplace/providers?radiusKm=
 * - Eligibility preview via MarketplaceEligibilityService (BOTH check)
 * - Empty-state expansion UI via RadiusExpansionComponent
 *
 * No hard-coded security enforcement; backend validates radius and eligibility.
 */

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadiusExpansionComponent } from '../../shared/components/radius-expansion/radius-expansion.component';
import { DiscoveryService } from '../../core/services/discovery.service';
import { MarketplaceRadiusConfigService } from '../../core/config/marketplace-radius.config';
import { MarketplaceEligibilityService } from '../../core/services/marketplace-eligibility.service';
import { CustomerDiscoveryRadiusKm } from '../../core/models/discovery-radius.model';

@Component({
  selector: 'waasha-discovery-page',
  standalone: true,
  imports: [CommonModule, RadiusExpansionComponent],
  template: `
    <header class="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-3 shadow-sm">
      <span class="rounded-full bg-[#E6F7F5] px-2.5 py-1 text-xs font-bold text-[#0B1F33]">
        {{ discovery.currentRadius }} km radius
      </span>
      <span class="text-xs text-[#667085]">Max {{ maxRadius }} km • Provider coverage applies</span>
    </header>

    <main class="mx-auto max-w-md space-y-4 p-4">
      <div *ngIf="providers.length === 0">
        <waasha-radius-expansion
          [currentRadiusKm]="discovery.currentRadius"
          [canExpandTo]="nextRadius"
          [maxRadiusKm]="maxRadius"
          [total]="providers.length"
          (expand)="onExpand($event)"
        />
      </div>

      <div *ngFor="let p of providers" class="rounded-xl border border-[#E2E8F0] p-3">
        <div class="text-sm font-bold text-[#0B1F33]">{{ p.displayName }}</div>
        <div class="text-xs text-[#667085]">
          {{ p.distanceKm | number: '1.1-1' }} km away • Coverage {{ p.coverageRadiusKm }} km •
          {{ eligibleLabel(p) }}
        </div>
      </div>

      <p class="text-center text-xs text-[#667085]">
        Backend validates radius & eligibility (distance ≤ customer radius AND ≤ provider coverage).
      </p>
    </main>
  `,
})
export class DiscoveryPage implements OnInit {
  readonly discovery = inject(DiscoveryService);
  private readonly config = inject(MarketplaceRadiusConfigService);
  private readonly eligibility = inject(MarketplaceEligibilityService);

  providers: { displayName: string; distanceKm: number; coverageRadiusKm: number }[] = [];
  nextRadius: CustomerDiscoveryRadiusKm | null = null;
  maxRadius: CustomerDiscoveryRadiusKm = 20;

  ngOnInit(): void {
    this.config.fetchConfig().subscribe((cfg) => {
      this.maxRadius = cfg.maxCustomerRadiusKm;
      this.nextRadius = this.config.nextCustomerRadius(this.discovery.currentRadius);
    });
    this.discovery.initFromConfig();
    this.discovery.radius$.subscribe(() => {
      this.nextRadius = this.config.nextCustomerRadius(this.discovery.currentRadius);
    });
    // Example: discovery.fetchWithCurrentRadius({ latitude: -26.2041, longitude: 28.0473 }).subscribe(res => this.providers = res.data)
  }

  onExpand(next: CustomerDiscoveryRadiusKm): void {
    this.discovery.setRadius(next);
    // Re-query with new radius — backend enforces
    // this.discovery.fetchWithCurrentRadius(loc).subscribe(...)
  }

  eligibleLabel(p: { distanceKm: number; coverageRadiusKm: number }): string {
    const e = this.eligibility.checkEligibility(
      p.distanceKm,
      this.discovery.currentRadius,
      p.coverageRadiusKm as CustomerDiscoveryRadiusKm,
    );
    return e.eligible ? 'Eligible' : e.reason ?? 'Not eligible';
  }
}
