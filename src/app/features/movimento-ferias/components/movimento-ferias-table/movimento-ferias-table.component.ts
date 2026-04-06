import { Component, input, output } from '@angular/core';
import { DataTableComponent, TableCellDirective } from '../../../../shared/components/data-table/data-table.component';
import { TableColumn } from '../../../../shared/components/data-table/data-table.model';
import { MovimentoFeriasRow } from '../../store/movimento-ferias.store';
import { ButtonComponent } from "../../../../shared/components/ui/button/button.component";

@Component({
  selector: 'app-movimento-ferias-table',
  standalone: true,
  imports: [DataTableComponent, TableCellDirective , ButtonComponent],
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
    { key: 'acoes',                label: 'Ações',  width: 'w-20'   },
  ];

  editar = output<MovimentoFeriasRow>();
}