import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { MovimentoFeriasStore } from "../store/movimento-ferias.store";
import { MovimentoFeriasFilterComponent } from "../components/movimento-ferias-filter/movimento-ferias-filter.component";
import { MovimentoFeriasTableComponent } from "../components/movimento-ferias-table/movimento-ferias-table.component";
import { MovimentoFeriasFilter } from "../models/movimento-ferias-filter.model";
import { MovimentoFeriasRow } from "../store/movimento-ferias.store";
import { PaginacaoComponent } from "../../../shared/components/paginacao/paginacao.component";
import { PageBreadcrumbComponent } from "../../../shared/components/common/page-breadcrumb/page-breadcrumb.component";
import { MovimentoFeriasEditStore } from "../store/movimento-ferias-edit.store";

@Component({
  selector: "app-movimento-ferias-list",
  standalone: true,
  imports: [
    MovimentoFeriasFilterComponent,
    MovimentoFeriasTableComponent,
    PaginacaoComponent,
    PageBreadcrumbComponent,
  ],
  templateUrl: "./movimento-ferias-list.page.html",
})
export class MovimentoFeriasListPage {
  readonly store: InstanceType<typeof MovimentoFeriasStore> =
    inject(MovimentoFeriasStore);
  readonly editStore: InstanceType<typeof MovimentoFeriasEditStore> = inject(
    MovimentoFeriasEditStore,
  );
  private router = inject(Router);

  onSelecionar(filtros: MovimentoFeriasFilter): void {
    this.store.selecionar(filtros);
  }

  onEditar(row: MovimentoFeriasRow): void {
    this.editStore.obter(row);
    this.router.navigate(["/movimentoFerias", row.id, "editar"]);
  }
}
