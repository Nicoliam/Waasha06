import { Component } from '@angular/core';

@Component({
  selector: 'waasha-logo',
  standalone: true,
  template: `
    <span class="wa-logo" aria-label="Waasha">
      <span class="wa-logo-mark" aria-hidden="true">
        <span class="wa-logo-diamond"></span>
        <span class="wa-logo-w">W</span>
      </span>
      <span>WAASHA</span>
      <span style="font-weight:400; color: #667085; font-size: 11px; letter-spacing: 0.06em; margin-left: 2px;">THE FUTURE OF SERVICE, TODAY.</span>
    </span>
  `,
})
export class WaashaLogoComponent {}
