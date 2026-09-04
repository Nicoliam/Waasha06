import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { WaashaLogoComponent } from '../../shared/components/waasha-logo.component';
type Mode='customer'|'provider';
@Component({
  selector: 'waasha-mobile-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, WaashaLogoComponent],
  template: `
    <div style="max-width:520px; margin: 16px auto; padding: 0 14px;">
      <div class="wa-card">
        <waasha-logo />
        <p class="wa-kicker" style="margin-top:12px">Create account</p>
        <h1 class="wa-title">Join Waasha</h1>
        <div class="wa-tabs" style="margin:12px 0">
          <button class="wa-tab" [class.active]="mode==='customer'" (click)="mode='customer'">Customer</button>
          <button class="wa-tab" [class.active]="mode==='provider'" (click)="mode='provider'">Provider</button>
        </div>
        <div *ngIf="error" class="wa-error">{{error}}</div>
        <div *ngIf="success" class="wa-success">Account created — opening profile…</div>
        <ng-container *ngIf="mode==='customer'">
          <label class="wa-label">First name</label><input class="wa-input" [(ngModel)]="firstName" placeholder="Ava" />
          <label class="wa-label">Last name</label><input class="wa-input" [(ngModel)]="lastName" placeholder="Dlamini" />
          <label class="wa-label">Email</label><input class="wa-input" type="email" [(ngModel)]="email" placeholder="you@example.com" />
          <label class="wa-label">Password</label><input class="wa-input" type="password" [(ngModel)]="password" placeholder="8+ chars, upper/lower/digit" />
          <button class="wa-btn wa-btn-primary" style="width:100%; margin-top:14px" (click)="registerCustomer()" [disabled]="loading||success">{{loading?'Creating…':'Create customer account'}}</button>
        </ng-container>
        <ng-container *ngIf="mode==='provider'">
          <label class="wa-label">Display name</label><input class="wa-input" [(ngModel)]="displayName" placeholder="Ava — Braids" />
          <label class="wa-label">Email</label><input class="wa-input" type="email" [(ngModel)]="email" placeholder="provider@example.com" />
          <label class="wa-label">Tier</label><select class="wa-select" [(ngModel)]="tierCode"><option value="T1">T1 — Individual</option><option value="T2">T2 — Team</option><option value="T3">T3 — Business</option></select>
          <label class="wa-label">Password</label><input class="wa-input" type="password" [(ngModel)]="password" placeholder="8+ chars, upper/lower/digit" />
          <button class="wa-btn wa-btn-primary" style="width:100%; margin-top:14px" (click)="registerProvider()" [disabled]="loading||success">{{loading?'Creating…':'Create provider account'}}</button>
        </ng-container>
        <p style="margin-top:14px; font-size:13px; color:#667085">Have an account? <a routerLink="/auth/login">Log in</a></p>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  private auth=inject(AuthService); private router=inject(Router);
  mode: Mode='customer'; email=''; password=''; firstName=''; lastName=''; displayName=''; tierCode:'T1'|'T2'|'T3'='T1'; loading=false; error: string|null=null; success=false;
  registerCustomer(){ this.error=null; if(!this.email||!this.password){ this.error='Email and password required.'; return; } this.loading=true; this.auth.registerCustomer({ email: this.email.trim(), password: this.password, firstName: this.firstName.trim()||undefined, lastName: this.lastName.trim()||undefined }).subscribe({ next:()=>{ this.loading=false; this.success=true; this.auth.fetchMe().subscribe(); setTimeout(()=>this.router.navigate(['/me']),600); }, error:(err)=>{ this.loading=false; this.error=err?.error?.error?.message ?? 'Registration failed.'; }}); }
  registerProvider(){ this.error=null; if(!this.email||!this.password){ this.error='Email and password required.'; return; } this.loading=true; this.auth.registerProvider({ email: this.email.trim(), password: this.password, displayName: this.displayName.trim()||undefined, tierCode: this.tierCode }).subscribe({ next:()=>{ this.loading=false; this.success=true; this.auth.fetchMe().subscribe(); setTimeout(()=>this.router.navigate(['/me']),600); }, error:(err)=>{ this.loading=false; this.error=err?.error?.error?.message ?? 'Registration failed.'; }}); }
}
