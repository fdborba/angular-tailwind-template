import { Component, input } from "@angular/core";
import { DataTableComponent } from "../../../../shared/components/data-table/data-table.component";
import { TableCellDirective } from "../../../../shared/components/data-table/data-table.component";
import { TableColumn } from "../../../../shared/components/data-table/data-table.model";
import { LancamentoCcuRow } from "../../store/lancamento-ccu.store";

type LancamentoRow = {
  id: number;
  codigo: string;
  requisitante: string;
  numRequisicao: string;
  solicitacao: string;
  status: string;
  statusId: number;
  usuarioNome: string;
  usuarioMatricula: number;
  equipeNome: string;
  dataReferencia: string;
  dataInicio: string;
  dataFim: string;
  duracaoHoras: string;
};

@Component({
  selector: "app-lancamento-ccu-table",
  standalone: true,
  imports: [DataTableComponent, TableCellDirective],
  templateUrl: "./lancamento-ccu-table.component.html",
})
export class LancamentoCcuTableComponent {
  rows = input<LancamentoRow[]>([]);
  loading = input<boolean>(false);
  columns: TableColumn[] = [
    { key: "dataReferencia", label: "Data ref." },
    { key: "codigo", label: "Código", cssClass: "font-mono text-xs" },
    { key: "requisitante", label: "Requisitante" },
    { key: "numRequisicao", label: "Nº Requisição" },
    { key: "horario", label: "Horário" },
    { key: "duracaoHoras", label: "Duração" },
    { key: "usuario", label: "Usuário" },
    { key: "equipeNome", label: "Equipe" },
    { key: "status", label: "Status" },
  ];

  statusClass(statusId: number): string {
    const map: Record<number, string> = {
      1: "bg-yellow-100 text-yellow-800",
      2: "bg-green-100 text-green-800",
      3: "bg-red-100 text-red-800",
    };
    return map[statusId] ?? "bg-gray-100 text-gray-600";
  }
}
