
import { Component } from '@angular/core';
import { LabelComponent } from '../../../genericos/label/label.component';
import { InputFieldComponent } from '../../../genericos/input/input-field.component';
import { PhoneInputComponent } from '../../group-input/phone-input/phone-input.component';
import { ComponentCardComponent } from '../../../common/component-card/component-card.component';

@Component({
  selector: 'app-input-group',
  imports: [
    LabelComponent,
    InputFieldComponent,
    PhoneInputComponent,
    ComponentCardComponent
],
  templateUrl: './input-group.component.html',
  styles: ``
})
export class InputGroupComponent {

  countries = [
    { code: 'US', label: '+1' },
    { code: 'GB', label: '+44' },
    { code: 'CA', label: '+1' },
    { code: 'AU', label: '+61' },
  ];

  handlePhoneNumberChange(phoneNumber: string) {
    console.log('Updated phone number:', phoneNumber);
  }
}
