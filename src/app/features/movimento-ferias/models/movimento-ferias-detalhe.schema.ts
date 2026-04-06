import { z } from 'zod';

const dateOrNull = z.string().nullable().transform(s => s ? new Date(s) : null);
const stringOrNumber = z.union([z.string(), z.number()])
  .nullable()
  .transform(v => v !== null ? String(v) : null);

const ExpedicaoPublicacaoDetalheSchema = z.object({
  codigo:              z.number(),
  codTipoExp:          z.number().nullable(),
  nroExp:              stringOrNumber,
  dataExp:             dateOrNull,
  tipoPublicacaoCod:   z.number().nullable(),
  nroPub:              stringOrNumber,
  dataPub:             dateOrNull,
  autoridadeCod:       z.number().nullable(),
  usuario:             z.string().nullable(),
  dataAtualizacao:     dateOrNull,
  dataDespacho:        dateOrNull,
  codApenso:           z.number().nullable(),
  dataAto:             dateOrNull,
  observacao:          z.string().nullable(),
  dataDisponibilizado: dateOrNull,
});

const MovimentoFeriasDetalheItemSchema = z.object({
  id:                   z.number(),
  empresa:              z.number(),
  filial:               z.number(),
  matricula:            z.number(),
  exercicio:            z.number(),
  dias:                 z.number(),
  naturezaFeriasCod:    z.number(),
  tipoPeriodoFeriasCod: z.number(),
  fundLegalCod:         z.number(),
  sitFuncCod:           z.number(),
  empresaSHFCod:        z.number(),
  grauDependenciaCod:   z.number().nullable(),
  sistemaIntegracaoCod: z.number().nullable(),
  perAquisitIni:        z.number().nullable(), 
  perAquisitFim:        z.number().nullable(), 
  dispOpLaba:           z.boolean(),
  alteracao:            z.boolean(),
  tipo:                 z.string().nullable(),
  adiantamento:         z.string().nullable(),
  gratificacaoNatalina: z.string().nullable(),
  abonoPecuniario:      z.string().nullable(),
  usuario:              z.string().nullable(),
  nomeParente:          z.string().nullable(),
  texto:                z.string().nullable(),
  idMovimento:          z.string(),
  sequencial:           stringOrNumber,
  numeroPedido:         stringOrNumber,
  dataIni:              dateOrNull,
  dataFim:              dateOrNull,
  movimento:            dateOrNull,
  dataMovimento:        dateOrNull,
  dataProtocolo:        dateOrNull,
  dataAtualizacao:      dateOrNull,
  expedientePublicacao: z.array(ExpedicaoPublicacaoDetalheSchema),
});

export const MovimentoFeriasDetalheResponseSchema = z.object({
  data: MovimentoFeriasDetalheItemSchema.nullable(),
});

export type MovimentoFeriasDetalheResponse = z.infer<typeof MovimentoFeriasDetalheResponseSchema>;
export type MovimentoFeriasDetalhe         = MovimentoFeriasDetalheResponse['data'];

export interface MovimentoFeriasIdCompostoFilter {
  empresa:     number;
  filial:      number;
  matricula:   number;
  movimento:   string;
  idMovimento: string;
}