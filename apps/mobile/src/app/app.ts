import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { WaashaLogoComponent } from './shared/components/waasha-logo.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, WaashaLogoComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
