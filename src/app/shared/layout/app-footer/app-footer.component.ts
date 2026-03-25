import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule,
    RouterModule,
  ],
  templateUrl: './app-footer.component.html',
})
export class AppFooterComponent {

}
