import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, AuthUser } from '../../core/services/auth.service';
import { WaashaLogoComponent } from '../../shared/components/waasha-logo.component';
@Component({
  selector: 'waasha-mobile-me',
  standalone: true,
  imports: [CommonModule, WaashaLogoComponent],
  template: `
    <div style="max-width:520px; margin: 16px auto; padding: 0 14px;">
      <div class="wa-card">
        <div style="display:flex; justify-content:space-between; align-items:center"><waasha-logo /><button class="wa-btn" style="background:#F6F8FA; border:1px solid #E2E8F0" (click)="logout()">Log out</button></div>
        <div *ngIf="loading" style="margin-top:14px; color:#667085">Loading…</div>
        <div *ngIf="!loading && user">
          <h2 class="wa-title" style="margin-top:14px">{{ displayName }}</h2>
          <p class="wa-subtitle">{{user.email}} • {{user.roles.join(', ')}}</p>
          <div style="display:grid; gap:12px; margin-top:12px">
            <div class="wa-card" style="padding:14px"><div class="wa-kicker">Customer</div><div *ngIf="user.customerProfile; else nc" style="font-size:13px; margin-top:6px">{{user.customerProfile.displayName}} — {{user.customerProfile.firstName}} {{user.customerProfile.lastName}}</div><ng-template #nc><span style="font-size:13px; color:#667085">No customer profile</span></ng-template></div>
            <div class="wa-card" style="padding:14px"><div class="wa-kicker">Provider</div><div *ngIf="user.providerProfile; else np" style="font-size:13px; margin-top:6px">{{user.providerProfile.displayName}} • Tier {{user.providerProfile.tier?.code ?? user.providerProfile.tierId}} • {{user.providerProfile.coverageRadiusKm}}km</div><ng-template #np><span style="font-size:13px; color:#667085">No provider profile</span></ng-template></div>
          </div>
        </div>
        <div *ngIf="!loading && !user" class="wa-error">Not authenticated.</div>
      </div>
    </div>
  `,
})
export class MeComponent implements OnInit {
  private auth=inject(AuthService); private router=inject(Router);
  user: AuthUser|null=null; loading=true;
  get displayName(): string { if(this.user?.providerProfile?.displayName) return this.user.providerProfile.displayName; if(this.user?.customerProfile?.displayName) return this.user.customerProfile.displayName; return this.user?.email ?? 'Me'; }
  ngOnInit(){ this.auth.fetchMe().subscribe(u=>{ this.user=u; this.loading=false; if(!u) this.router.navigate(['/auth/login']); }); }
  logout(){ this.auth.logout().subscribe(()=>this.router.navigate(['/auth/login'])); }
}
