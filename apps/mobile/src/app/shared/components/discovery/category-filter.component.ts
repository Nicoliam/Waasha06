import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCategory } from '../../../core/models/discovery-radius.model';

@Component({
  selector: 'waasha-mobile-category-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="wa-cats" role="group" aria-label="Filter by category">
      <button
        type="button"
        class="wa-cat"
        [class.active]="!selectedCategoryId"
        (click)="select.emit(null)"
        aria-label="Show all categories"
      >
        <span class="wa-cat__icon" aria-hidden="true">◎</span>
        <span class="wa-cat__label">All</span>
      </button>
      <button
        *ngFor="let cat of categories; trackBy: trackCat"
        type="button"
        class="wa-cat"
        [class.active]="selectedCategoryId === cat.id || selectedCategoryId === cat.code"
        (click)="select.emit(cat.id)"
        [attr.aria-pressed]="selectedCategoryId === cat.id || selectedCategoryId === cat.code"
      >
        <span class="wa-cat__icon" aria-hidden="true">{{ iconFor(cat.code) }}</span>
        <span class="wa-cat__label">{{ shortName(cat.name) }}</span>
      </button>
    </div>
  `,
  styles: [`
    .wa-cats { display: flex; gap: 8px; overflow-x: auto; padding: 4px 0 8px; scrollbar-width: none; }
    .wa-cats::-webkit-scrollbar { display: none; }
    .wa-cat { display: inline-flex; flex-direction: column; align-items: center; gap: 6px; min-width: 76px; padding: 10px 6px; border-radius: 16px; border: 1px solid #E2E8F0; background: white; cursor: pointer; flex-shrink: 0; }
    .wa-cat.active { background: #0B1F33; color: white; border-color: #0B1F33; }
    .wa-cat__icon { width: 32px; height: 32px; border-radius: 10px; background: #F6F8FA; border: 1px solid #E2E8F0; display: grid; place-items: center; font-size: 14px; }
    .wa-cat.active .wa-cat__icon { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.2); }
    .wa-cat__label { font-size: 10px; font-weight: 700; text-align: center; line-height: 1.2; }
  `]
})
export class MobileCategoryFilterComponent {
  @Input() categories: ServiceCategory[] = [];
  @Input() selectedCategoryId: string | null = null;
  @Output() select = new EventEmitter<string | null>();
  trackCat(_: number, c: ServiceCategory): string { return c.id; }
  iconFor(code: string): string {
    if (code === 'BARBERS') return '💈';
    if (code === 'HAIR_SALONS_STYLISTS') return '💇';
    if (code === 'NAIL_TECHNICIANS') return '💅';
    if (code === 'BEAUTY_SERVICES') return '💄';
    if (code === 'CAR_WASH') return '🚗';
    return '✦';
  }
  shortName(name: string): string {
    if (name === 'Hair Salons & Stylists') return 'Hair Salons';
    if (name === 'Nail Technicians') return 'Nail Techs';
    return name;
  }
}
