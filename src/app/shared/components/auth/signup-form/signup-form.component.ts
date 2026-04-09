
import { Component } from '@angular/core';
import { LabelComponent } from '../../genericos/label/label.component';
import { CheckboxComponent } from '../../genericos/checkbox/checkbox.component';
import { InputFieldComponent } from '../../genericos/input/input-field.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-signup-form',
  imports: [
    LabelComponent,
    CheckboxComponent,
    InputFieldComponent,
    RouterModule,
    FormsModule
],
  templateUrl: './signup-form.component.html',
  styles: ``
})
export class SignupFormComponent {

  showPassword = false;
  isChecked = false;

  fname = '';
  lname = '';
  email = '';
  password = '';

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSignIn() {
    console.log('First Name:', this.fname);
    console.log('Last Name:', this.lname);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Remember Me:', this.isChecked);
  }
}
