import { Component, inject } from '@angular/core';
import { MovimentoFeriasStore } from '../store/movimento-ferias.store';
import { MovimentoFeriasFilterComponent } from '../components/movimento-ferias-filter/movimento-ferias-filter.component';
import { MovimentoFeriasTableComponent } from '../components/movimento-ferias-table/movimento-ferias-table.component';
import { MovimentoFeriasFilter } from '../models/movimento-ferias-filter.model';
import { PageBreadcrumbComponent } from "../../../shared/components/common/page-breadcrumb/page-breadcrumb.component";
import { PaginacaoComponent } from "../../../shared/components/paginacao/paginacao.component";

@Component({
  selector: 'app-movimento-ferias-list',
  standalone: true,
  imports: [MovimentoFeriasFilterComponent, MovimentoFeriasTableComponent, PageBreadcrumbComponent, PaginacaoComponent],
  templateUrl: './movimento-ferias-list.page.html',
})
export class MovimentoFeriasListPage {
  readonly store: InstanceType<typeof MovimentoFeriasStore> = inject(MovimentoFeriasStore);

  onSelecionar(filtros: MovimentoFeriasFilter): void {
    this.store.selecionar(filtros);
  }
}