import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageBreadcrumbComponent } from "../../../shared/components/common/page-breadcrumb/page-breadcrumb.component";
import { LabelComponent } from "../../../shared/components/genericos/label/label.component";
import { InputFieldComponent } from "../../../shared/components/genericos/input/input-field.component";
import { MovimentoFeriasEditStore } from '../store/movimento-ferias-edit.store';

@Component({
  selector: 'app-movimento-ferias-edit',
  standalone: true,
  imports: [PageBreadcrumbComponent, LabelComponent, InputFieldComponent],
  templateUrl: './movimento-ferias-edit.page.html',
})
export class MovimentoFeriasEditPage {
  readonly store: InstanceType<typeof MovimentoFeriasEditStore> = inject(MovimentoFeriasEditStore);
  private router = inject(Router);

  onVoltar(): void {
    this.router.navigate(['/movimentoFerias']);
  }
}