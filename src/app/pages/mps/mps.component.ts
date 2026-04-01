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

toggleAccordion(index: number) {
    const content = document.getElementById(`content-${index}`);
    const icon = document.getElementById(`icon-${index}`);
 
    // SVG for Down icon
    const downSVG = `<i class="fas fa-chevron-down w-2 h-2"></i>`;
 
    // SVG for Up icon
    const upSVG = `<i class="fas fa-chevron-up w-2 h-2"></i>`;
 
    if (!content || !icon) return;
    // Toggle the content's max-height for smooth opening and closing
    if (content.style.maxHeight && content.style.maxHeight == '0px') {
      content.style.maxHeight = content.scrollHeight + 'px';
      icon.innerHTML = downSVG;
    } else {
      content.style.maxHeight = '0';
      icon.innerHTML = upSVG;
    }
  }

}