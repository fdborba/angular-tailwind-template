import { computed, inject } from "@angular/core";
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
} from "@ngrx/signals";
import { firstValueFrom } from "rxjs";
import { MovimentoFeriasDetalhe } from "../models/movimento-ferias-detalhe.schema";
import { MovimentoFeriasService } from "../services/movimento-ferias.service";
import { MovimentoFeriasRow } from "./movimento-ferias.store";

interface MovimentoFeriasEditState {
  detalhe: MovimentoFeriasDetalhe | null;
  loading: boolean;
  erro: string | null;
}

const estadoInicial: MovimentoFeriasEditState = {
  detalhe: null,
  loading: false,
  erro: null,
};

export const MovimentoFeriasEditStore = signalStore(
  { providedIn: "root" },

  withState<MovimentoFeriasEditState>(estadoInicial),

  withComputed((store) => ({
  detalheFormatado: computed(() => {
    const d = store.detalhe();

    return {
      id:                   d?.id                    ?? 0,
      idMovimento:          d?.idMovimento            ?? '—',
      empresa:              d?.empresa               ?? 0,
      filial:               d?.filial                ?? 0,
      matricula:            d?.matricula             ?? 0,
      exercicio:            d?.exercicio             ?? 0,
      dias:                 d?.dias                  ?? 0,
      tipo:                 d?.tipo                  ?? '—',
      adiantamento:         d?.adiantamento          ?? '—',
      gratificacaoNatalina: d?.gratificacaoNatalina  ?? '—',
      abonoPecuniario:      d?.abonoPecuniario       ?? '—',
      usuario:              d?.usuario               ?? '—',
      nomeParente:          d?.nomeParente           ?? '—',
      texto:                d?.texto                 ?? '—',
      dataIni:              formatarData(d?.dataIni          ?? null),
      dataFim:              formatarData(d?.dataFim          ?? null),
      dataMovimento:        formatarData(d?.dataMovimento    ?? null),
      dataAtualizacao:      formatarData(d?.dataAtualizacao  ?? null),
      dataProtocolo:        formatarData(d?.dataProtocolo    ?? null),
      expedientePublicacao: d?.expedientePublicacao  ?? [],
    };
  }),
})),

  withMethods((store, service = inject(MovimentoFeriasService)) => ({
    async obter(row: MovimentoFeriasRow): Promise<void> {
      patchState(store, { loading: true, erro: null, detalhe: null });
      try {
        const ehRegistroAntigo =
          !row.idMovimento ||
          row.idMovimento === "00000000-0000-0000-0000-000000000000";

        const detalhe = await firstValueFrom(
          ehRegistroAntigo
            ? service.obterPorIdComposto({
                empresa: row.empresa,
                filial: row.filial,
                matricula: row.matricula,
                movimento: row.movimento,
                idMovimento: row.idMovimento,
              })
            : service.obter(row.idMovimento),
        );

        if (!detalhe) {
          patchState(store, {
            erro: "Detalhes do movimento não encontrados.",
            loading: false,
          });
          return;
        }

        patchState(store, { detalhe, loading: false });
      } catch (e) {
        const mensagem =
          e instanceof Error ? e.message : "Erro ao carregar movimento";
        patchState(store, { erro: mensagem, loading: false });
      }
    },

    limpar(): void {
      patchState(store, estadoInicial);
    },
  })),
);

function formatarData(data: Date | null): string {
  if (!data) return "—";
  return data.toLocaleDateString("pt-BR");
}
