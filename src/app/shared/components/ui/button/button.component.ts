import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SafeHtmlPipe } from '../../../pipe/safe-html.pipe';

@Component({
  selector: 'app-button',
  imports: [
    CommonModule,
    SafeHtmlPipe,
  ],
  templateUrl: './button.component.html',
  styles: ``,
  host: {

  },
})
export class ButtonComponent {

  @Input() size: 'sm' | 'md' = 'md';
  @Input() variant: 'primary' | 'outline' = 'primary';
  @Input() disabled = false;
  @Input() className = '';
  @Input() startIcon?: string; // SVG or icon class, or use ng-content for more flexibility
  @Input() endIcon?: string;

  @Output() btnClick = new EventEmitter<Event>();

  get sizeClasses(): string {
    return this.size === 'sm'
      ? 'px-3 py-1.5 text-sm'
      : 'px-5 py-3.5 text-sm';
  }

  get variantClasses(): string {
    return this.variant === 'primary'
      ? 'bg-white border border-[#0062cc] text-[#0069d9] focus:bg-{#0069d98f} active:bg-[#0069d9] hover:bg-[#0069d98f]'
      : 'bg-white border border-[#117a8b] text-[#138496] focus:bg-[#1384969e] active:bg-[#138496] hover:bg-[#1384969e]';
  }

  get disabledClasses(): string {
    return this.disabled ? 'cursor-not-allowed opacity-50' : '';
  }

  onClick(event: Event) {
    if (!this.disabled) {
      this.btnClick.emit(event);
    }
  }
}
