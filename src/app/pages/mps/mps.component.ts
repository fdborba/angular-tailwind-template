import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { LabelComponent } from '../../shared/components/form/label/label.component';
import { InputFieldComponent } from '../../shared/components/form/input/input-field.component';

@Component({
  selector: 'app-mps',
  imports: [
    PageBreadcrumbComponent,
    LabelComponent,
    InputFieldComponent
  ],
  templateUrl: './mps.component.html',
})
export class MpsComponent {

}
