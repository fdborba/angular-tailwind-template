import { computed, inject } from "@angular/core";
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
} from "@ngrx/signals";
import { firstValueFrom } from "rxjs";
import { LancamentoCcu } from "../models/lancamento-ccu.schema";
import { LancamentoCcuFilter } from "../models/lancamento-ccu-filter.model";
import { LancamentoCcuService } from "../services/lancamento-ccu.service";

export interface LancamentoCcuRow {
  id: number;
  codigo: string;
  requisitante: string;
  numRequisicao: string;
  solicitacao: string;
  atividade: string;
  status: string;
  statusId: number;
  usuarioNome: string;
  usuarioMatricula: number;
  equipeNome: string;
  dataReferencia: string;
  dataInicio: string;
  dataFim: string;
  duracaoHoras: string;
}

interface LancamentoCcuState {
  lancamentos: LancamentoCcu[];
  loading: boolean;
  erro: string | null;
  filtrosAtivos: LancamentoCcuFilter;
}

const estadoInicial: LancamentoCcuState = {
  lancamentos: [],
  loading: false,
  erro: null,
  filtrosAtivos: {},
};

export const LancamentoCcuStore = signalStore(
  { providedIn: "root" },
  withState<LancamentoCcuState>(estadoInicial),
  withComputed((store) => ({
    rows: computed((): LancamentoCcuRow[] =>
      store.lancamentos().map(
        (l: LancamentoCcu): LancamentoCcuRow => ({
          id: l.Id,
          codigo: l.Codigo,
          requisitante: l.Requisitante,
          numRequisicao: l.NumRequisicao ?? "—",
          solicitacao: l.Solicitacao ?? "—",
          atividade: l.Atividade,
          status: l.StatusLancamentoCcuDescricao,
          statusId: l.StatusLancamentoCcuId,
          usuarioNome: l.UsuarioNome,
          usuarioMatricula: l.UsuarioMatricula,
          equipeNome: l.EquipeNome,
          dataReferencia: l.DataReferencia.toLocaleDateString("pt-BR"),
          dataInicio: l.DataInicio.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          dataFim: l.DataFim.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          duracaoHoras: calcularDuracao(l.DataInicio, l.DataFim),
        })
      )
    ),
    totalRegistros: computed((): number => store.lancamentos().length),
  })),
  withMethods((store, service = inject(LancamentoCcuService)) => ({
    async pesquisar(filtros: LancamentoCcuFilter): Promise<void> {
      console.log("4. store.pesquisar chamado com:", filtros);
      patchState(store, {
        loading: true,
        erro: null,
        filtrosAtivos: filtros,
      });

      try {
        const dados = await firstValueFrom(service.pesquisar(filtros));
        patchState(store, {
          lancamentos: dados,
          loading: false,
        });
      } catch (e) {
        const mensagem =
          e instanceof Error ? e.message : "Erro ao carregar lançamentos";
        patchState(store, {
          erro: mensagem,
          loading: false,
          lancamentos: [],
        });
      }
    },

    limpar(): void {
      patchState(store, estadoInicial);
    },
  }))
);

function calcularDuracao(inicio: Date, fim: Date): string {
  const totalMinutos = Math.floor((fim.getTime() - inicio.getTime()) / 60000);
  const horas = Math.floor(totalMinutos / 60);
  const minutos = totalMinutos % 60;
  return `${horas}h${minutos.toString().padStart(2, "0")}`;
}
