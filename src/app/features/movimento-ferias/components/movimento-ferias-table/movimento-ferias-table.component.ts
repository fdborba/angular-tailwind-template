import { Component, input } from '@angular/core';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { TableColumn } from '../../../../shared/components/data-table/data-table.model';
import { MovimentoFeriasRow } from '../../store/movimento-ferias.store';

@Component({
  selector: 'app-movimento-ferias-table',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './movimento-ferias-table.component.html',
})
export class MovimentoFeriasTableComponent {
  rows    = input<MovimentoFeriasRow[]>([]);
  loading = input<boolean>(false);

  columns: TableColumn[] = [
    { key: 'exercicio',            label: 'Exercício'         },
    { key: 'dataIni',              label: 'Início'            },
    { key: 'dataFim',              label: 'Fim'               },
    { key: 'dias',                 label: 'Dias'              },
    { key: 'tipo',                 label: 'Tipo'              },
    { key: 'adiantamento',         label: 'Adiantamento'      },
    { key: 'abonoPecuniario',      label: 'Abono Pecuniário'  },
    { key: 'gratificacaoNatalina', label: 'Grat. Natalina'    },
    { key: 'perAquisitIni',        label: 'Per. Aquis. Início'},
    { key: 'perAquisitFim',        label: 'Per. Aquis. Fim'   },
    { key: 'dataMovimento',        label: 'Data Movimento'    },
    { key: 'usuario',              label: 'Usuário'           },
    { key: 'dataAtualizacao',      label: 'Atualização'       },
  ];
}