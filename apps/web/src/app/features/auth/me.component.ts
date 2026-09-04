import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, AuthUser } from '../../core/services/auth.service';
import { WaashaLogoComponent } from '../../shared/components/waasha-logo.component';

@Component({
  selector: 'waasha-me',
  standalone: true,
  imports: [CommonModule, WaashaLogoComponent],
  template: `
    <div style="max-width:640px; margin: 24px auto;">
      <div class="wa-card">
        <div style="display:flex; justify-content:space-between; align-items:center">
          <waasha-logo />
          <button class="wa-btn wa-btn-ghost" (click)="logout()">Log out</button>
        </div>
        <div *ngIf="loading" style="margin-top:16px; color:#667085; font-size:14px">Loading profile…</div>
        <div *ngIf="!loading && user">
          <h2 class="wa-title" style="margin-top:16px">{{ displayName }}</h2>
          <p class="wa-subtitle">{{ user.email }} • {{ user.status }} • Roles: {{ user.roles.join(', ') || '—' }}</p>

          <div class="wa-grid-2">
            <div class="wa-card" style="padding:16px">
              <div class="wa-kicker">Customer profile</div>
              <div *ngIf="user.customerProfile; else noCust" style="margin-top:8px; font-size:13px; line-height:1.6">
                <div><strong>{{ user.customerProfile.displayName }}</strong></div>
                <div style="color:#667085">{{ user.customerProfile.firstName }} {{ user.customerProfile.lastName }}</div>
              </div>
              <ng-template #noCust><div style="margin-top:8px; font-size:13px; color:#667085">No customer profile</div></ng-template>
            </div>
            <div class="wa-card" style="padding:16px">
              <div class="wa-kicker">Provider profile</div>
              <div *ngIf="user.providerProfile; else noProv" style="margin-top:8px; font-size:13px; line-height:1.6">
                <div><strong>{{ user.providerProfile.displayName }}</strong></div>
                <div style="color:#667085">Tier: {{ user.providerProfile.tier?.code ?? user.providerProfile.tierId }} • {{ user.providerProfile.providerType }}</div>
                <div style="color:#667085">Coverage: {{ user.providerProfile.coverageRadiusKm }} km • {{ user.providerProfile.verificationStatus }}</div>
              </div>
              <ng-template #noProv><div style="margin-top:8px; font-size:13px; color:#667085">No provider profile</div></ng-template>
            </div>
          </div>

          <div style="margin-top:16px; font-size:12px; color:#667085">
            Tenant isolation: this view is derived from your JWT — you only see your own data.
          </div>
        </div>
        <div *ngIf="!loading && !user" style="margin-top:16px" class="wa-error">Not authenticated. Please log in.</div>
      </div>
    </div>
  `,
})
export class MeComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  user: AuthUser | null = null;
  loading = true;

  get displayName(): string {
    if (this.user?.providerProfile?.displayName) return this.user.providerProfile.displayName;
    if (this.user?.customerProfile?.displayName) return this.user.customerProfile.displayName;
    return this.user?.email ?? 'My account';
  }

  ngOnInit() {
    this.auth.fetchMe().subscribe((u) => { this.user = u; this.loading = false; if (!u) this.router.navigate(['/auth/login']); });
  }

  logout() {
    this.auth.logout().subscribe(() => this.router.navigate(['/auth/login']));
  }
}
