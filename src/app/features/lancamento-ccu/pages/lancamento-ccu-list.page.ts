import { Component, inject, OnInit } from "@angular/core";
import { LancamentoCcuStore } from "../store/lancamento-ccu.store";
import { LancamentoCcuFilterComponent } from "../components/lancamento-ccu-filter/lancamento-ccu-filter.component";
import { LancamentoCcuTableComponent } from "../components/lancamento-ccu-table/lancamento-ccu-table.component";
import { LancamentoCcuFilter } from "../models/lancamento-ccu-filter.model";

@Component({
  selector: "app-lancamento-ccu-list",
  standalone: true,
  imports: [LancamentoCcuFilterComponent, LancamentoCcuTableComponent],
  templateUrl: "./lancamento-ccu-list.page.html",
})
export class LancamentoCcuListPage {
  readonly store: InstanceType<typeof LancamentoCcuStore> =
    inject(LancamentoCcuStore);
  onPesquisar(filtros: LancamentoCcuFilter): void {
    console.log("3. filtros recebidos na page:", filtros);
    this.store.pesquisar(filtros);
  }
}
