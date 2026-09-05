import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Customer discovery — primary home per Phase 1 (no auth required for marketplace browsing)
  { path: '', loadComponent: () => import('./features/discovery/discovery.component').then((m) => m.DiscoveryComponent) },
  { path: 'discovery', loadComponent: () => import('./features/discovery/discovery.component').then((m) => m.DiscoveryComponent) },
  {
    path: 'providers/:id',
    loadComponent: () => import('./features/provider/provider-profile.component').then((m) => m.ProviderProfileComponent),
  },
  { path: 'auth/login', loadComponent: () => import('./features/auth/login.component').then((m) => m.LoginComponent) },
  { path: 'auth/register', loadComponent: () => import('./features/auth/register.component').then((m) => m.RegisterComponent) },
  { path: 'me', loadComponent: () => import('./features/auth/me.component').then((m) => m.MeComponent), canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
