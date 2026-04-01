import { Component, input } from '@angular/core';

// Tipo inferido do computed rows() do store
type LancamentoRow = {
  id: number; codigo: string; requisitante: string;
  numRequisicao: string; solicitacao: string;
  status: string; statusId: number;
  usuarioNome: string; usuarioMatricula: number; equipeNome: string;
  dataReferencia: string; dataInicio: string; dataFim: string; duracaoHoras: string;
};

@Component({
  selector: 'app-lancamento-ccu-table',
  standalone: true,
  templateUrl: './lancamento-ccu-table.component.html',
})
export class LancamentoCcuTableComponent {
  rows    = input<LancamentoRow[]>([]);
  loading = input<boolean>(false);

  statusClass(statusId: number): string {
    const map: Record<number, string> = {
      1: 'bg-yellow-100 text-yellow-800',
      2: 'bg-green-100 text-green-800',
      3: 'bg-red-100 text-red-800',
    };
    return map[statusId] ?? 'bg-gray-100 text-gray-600';
  }
}