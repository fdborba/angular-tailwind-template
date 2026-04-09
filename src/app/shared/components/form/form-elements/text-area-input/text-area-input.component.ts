import { Component } from '@angular/core';
import { TextAreaComponent } from '../../../genericos/text-area/text-area.component';

import { LabelComponent } from '../../../genericos/label/label.component';
import { ComponentCardComponent } from '../../../common/component-card/component-card.component';

@Component({
  selector: 'app-text-area-input',
  imports: [
    TextAreaComponent,
    LabelComponent,
    ComponentCardComponent
],
  templateUrl: './text-area-input.component.html',
  styles: ``
})
export class TextAreaInputComponent {

  message = '';
  messageTwo = '';
}
