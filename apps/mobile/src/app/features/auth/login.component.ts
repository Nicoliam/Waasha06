import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { WaashaLogoComponent } from '../../shared/components/waasha-logo.component';
@Component({
  selector: 'waasha-mobile-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, WaashaLogoComponent],
  template: `
    <div style="max-width:480px; margin: 16px auto; padding: 0 14px;">
      <div class="wa-card">
        <waasha-logo />
        <p class="wa-kicker" style="margin-top:12px">Welcome back</p>
        <h1 class="wa-title">Log in</h1>
        <p class="wa-subtitle">Waasha mobile — same secure API.</p>
        <div *ngIf="error" class="wa-error">{{error}}</div>
        <label class="wa-label">Email</label><input class="wa-input" type="email" [(ngModel)]="email" placeholder="you@example.com" />
        <label class="wa-label">Password</label><input class="wa-input" type="password" [(ngModel)]="password" placeholder="••••••••" />
        <button class="wa-btn wa-btn-primary" style="width:100%; margin-top:16px" (click)="submit()" [disabled]="loading">{{ loading ? 'Signing in…' : 'Log in' }}</button>
        <p style="margin-top:14px; font-size:13px; color:#667085">No account? <a routerLink="/auth/register">Create account</a></p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  email=''; password=''; loading=false; error: string | null = null;
  submit(){ this.error=null; if(!this.email||!this.password){ this.error='Email and password required.'; return; } this.loading=true; this.auth.login({ email: this.email.trim(), password: this.password}).subscribe({ next: ()=>{ this.loading=false; this.auth.fetchMe().subscribe(); this.router.navigate(['/me']); }, error: (err)=>{ this.loading=false; this.error = err?.error?.error?.message ?? 'Login failed.'; }}); }
}
