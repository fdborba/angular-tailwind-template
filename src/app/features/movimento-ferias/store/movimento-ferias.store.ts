import { computed, inject } from "@angular/core";
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
} from "@ngrx/signals";
import { firstValueFrom } from "rxjs";
import {
  MovimentoFerias,
  MovimentoFeriasPagination,
} from "../models/movimento-ferias.schema";
import { MovimentoFeriasFilter } from "../models/movimento-ferias-filter.model";
import { MovimentoFeriasService } from "../services/movimento-ferias.service";

export interface MovimentoFeriasRow {
  id: number;
  matricula: number;
  exercicio: number;
  dias: number;
  tipo: string;
  adiantamento: string;
  gratificacaoNatalina: string;
  abonoPecuniario: string;
  usuario: string;
  dataIni: string;
  dataFim: string;
  dataMovimento: string;
  dataAtualizacao: string;
  perAquisitIni: string;
  perAquisitFim: string;
  idMovimento: string;
  empresa: number;
  filial: number;
  movimento: string;
}

interface MovimentoFeriasState {
  movimentos: MovimentoFerias[];
  pagination: MovimentoFeriasPagination | null;
  loading: boolean;
  erro: string | null;
  filtrosAtivos: Partial<MovimentoFeriasFilter>;
}

const estadoInicial: MovimentoFeriasState = {
  movimentos: [],
  pagination: null,
  loading: false,
  erro: null,
  filtrosAtivos: {},
};

export const MovimentoFeriasStore = signalStore(
  { providedIn: "root" },

  withState<MovimentoFeriasState>(estadoInicial),

  withComputed((store) => ({
    rows: computed((): MovimentoFeriasRow[] =>
      store.movimentos().map(
        (m: MovimentoFerias): MovimentoFeriasRow => ({
          id: m.id,
          matricula: m.matricula,
          exercicio: m.exercicio,
          dias: m.dias,
          tipo: m.tipo ?? "—",
          adiantamento: m.adiantamento ?? "—",
          gratificacaoNatalina: m.gratificacaoNatalina ?? "—",
          abonoPecuniario: m.abonoPecuniario ?? "—",
          usuario: m.usuario ?? "—",
          dataIni: formatarData(m.dataIni),
          dataFim: formatarData(m.dataFim),
          dataMovimento: formatarData(m.dataMovimento),
          dataAtualizacao: formatarData(m.dataAtualizacao),
          perAquisitIni: formatarData(m.perAquisitIni),
          perAquisitFim: formatarData(m.perAquisitFim),
          idMovimento: m.idMovimento,
          empresa: m.empresa,
          filial: m.filial,
          movimento: m.movimento ? formatarDataISO(m.movimento) : '',
        }),
      ),
    ),
    totalRegistros: computed((): number => store.pagination()?.totalElements ?? 0),
    paginaAtual: computed((): number => store.pagination()?.page ?? 1),
    totalPaginas: computed((): number => store.pagination()?.totalPages ?? 0),
  })),

  withMethods((store, service = inject(MovimentoFeriasService)) => ({
    async selecionar(filtros: MovimentoFeriasFilter): Promise<void> {
      patchState(store, { loading: true, erro: null, filtrosAtivos: filtros });
      try {
        const resultado = await firstValueFrom(service.selecionar(filtros));
        patchState(store, {
          movimentos: resultado.data,
          pagination: resultado.pagination,
          loading: false,
        });
      } catch (e) {
        const mensagem =
          e instanceof Error ? e.message : "Erro ao carregar movimentos";
        patchState(store, {
          erro: mensagem,
          loading: false,
          movimentos: [],
          pagination: null,
        });
      }
    },

    async irParaPagina(page: number): Promise<void> {
      const filtrosAtuais = store.filtrosAtivos() as MovimentoFeriasFilter;
      const filtrosComPagina: MovimentoFeriasFilter = {
        ...filtrosAtuais,
        page,
        pageSize: store.pagination()?.pageSize ?? 10,
      };
      patchState(store, { loading: true, erro: null });
      try {
        const resultado = await firstValueFrom(
          service.selecionar(filtrosComPagina),
        );
        patchState(store, {
          movimentos: resultado.data,
          pagination: resultado.pagination,
          loading: false,
        });
      } catch (e) {
        const mensagem =
          e instanceof Error ? e.message : "Erro ao carregar movimentos";
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

function formatarDataISO(data: Date): string {
  const pad = (n: number, size = 2) => String(n).padStart(size, '0');

  const ano    = data.getFullYear();
  const mes    = pad(data.getMonth() + 1);
  const dia    = pad(data.getDate());
  const hora   = pad(data.getHours());
  const min    = pad(data.getMinutes());
  const seg    = pad(data.getSeconds());
  const ms     = pad(data.getMilliseconds(), 3);

  return `${ano}-${mes}-${dia} ${hora}:${min}:${seg}.${ms}`;
}