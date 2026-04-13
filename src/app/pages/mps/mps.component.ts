import { Component, inject } from '@angular/core';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { LabelComponent } from '../../shared/components/genericos/label/label.component';
import { InputFieldComponent } from '../../shared/components/genericos/input/input-field.component';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { ModalService } from '../../shared/services/modal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mps',
  imports: [
    PageBreadcrumbComponent,
    LabelComponent,
    InputFieldComponent,
    ModalComponent,
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

  constructor(public modal: ModalService) {}

  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }

  address = {
    invoiceNumber: 'PROJ1001',
    customer: 'John Doe',
    amount: '$1,200.00',
    issued: '2024-08-01',
    dueDate: '2024-08-15',
  };

  handleSave() {
    // Handle save logic here
    //console.log('Saving changes...');
    this.showSuccess();
    this.closeModal();
  }

toastr = inject(ToastrService);

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

}