import { z } from "zod";

const dateOrNull = z
  .string()
  .nullable()
  .transform((s) => (s ? new Date(s) : null));

const stringOrNumber = z.union([z.string(), z.number()])
  .nullable()
  .transform(v => v !== null ? String(v) : null);

const ExpedicaoPublicacaoSchema = z.object({
  codigo: z.number(),
  codTipoExp: z.number().nullable(),
  nroExp: stringOrNumber,
  dataExp: dateOrNull,
  tipoPublicacaoCod: z.number().nullable(),
  nroPub: stringOrNumber,
  dataPub: dateOrNull,
  autoridadeCod: z.number().nullable(),
  usuario: z.string().nullable(),
  dataAtualizacao: dateOrNull,
  dataDespacho: dateOrNull,
  codApenso: z.number().nullable(),
  dataAto: dateOrNull,
  observacao: z.string().nullable(),
  dataDisponibilizado: dateOrNull,
});

const MovimentoFeriasItemSchema = z.object({
  id: z.number(),
  empresa: z.number(),
  filial: z.number(),
  matricula: z.number(),
  exercicio: z.number(),
  dias: z.number(),
  naturezaFeriasCod: z.number(),
  tipoPeriodoFeriasCod: z.number(),
  fundLegalCod: z.number(),
  sitFuncCod: z.number(),
  empresaSHFCod: z.number(),
  tipo: z.string().nullable(),
  adiantamento: z.string().nullable(),
  gratificacaoNatalina: z.string().nullable(),
  abonoPecuniario: z.string().nullable(),
  usuario: z.string().nullable(),
  idMovimento: z.string(),
  numeroPedido: stringOrNumber,
  nomeParente: z.string().nullable(),
  texto: z.string().nullable(),
  sequencial: z.number().nullable(),
  grauDependenciaCod: z.number().nullable(),
  sistemaIntegracaoCod: z.number().nullable(),
  dispOpLaba: z.boolean(),
  alteracao: z.boolean(),
  dataIni: dateOrNull,
  dataFim: dateOrNull,
  movimento: dateOrNull,
  dataMovimento: dateOrNull,
  dataProtocolo: dateOrNull,
  dataAtualizacao: dateOrNull,
  perAquisitIni: dateOrNull,
  perAquisitFim: dateOrNull,
  expedientePublicacao: z.array(ExpedicaoPublicacaoSchema),
});

const PaginationSchema = z.object({
  page: z.number(),
  totalPages: z.number(),
  totalElements: z.number(),
  pageSize: z.number(),
});

export const MovimentoFeriasResponseSchema = z.object({
  pagination: PaginationSchema,
  data: z.array(MovimentoFeriasItemSchema),
});

export type MovimentoFeriasResponse = z.infer<
  typeof MovimentoFeriasResponseSchema
>;
export type MovimentoFerias = MovimentoFeriasResponse["data"][number];
export type MovimentoFeriasPagination = MovimentoFeriasResponse["pagination"];
