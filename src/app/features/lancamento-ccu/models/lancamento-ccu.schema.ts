import { z } from 'zod';

const LancamentoCcuItemSchema = z.object({
  Id:                           z.number(),
  UsuarioId:                    z.number(),
  UsuarioMatricula:             z.number(),
  UsuarioNome:                  z.string(),
  EquipeId:                     z.number(),
  EquipeNome:                   z.string(),
  DataLancamento:               z.string().transform(s => new Date(s)),
  DataReferencia:               z.string().transform(s => new Date(s)),
  DataInicio:                   z.string().transform(s => new Date(s)),
  DataFim:                      z.string().transform(s => new Date(s)),
  Codigo:                       z.string(),
  Requisitante:                 z.string(),
  NumRequisicao:                z.string().nullable(),
  Solicitacao:                  z.string().nullable(),
  Atividade:                    z.string(),
  TipoLancamentoCcuId:          z.number(),
  StatusLancamentoCcuId:        z.number(),
  StatusLancamentoCcuDescricao: z.string(),
});

export const LancamentoCcuResponseSchema = z.object({
  Success: z.boolean(),
  Message: z.string(),
  Data:    z.array(LancamentoCcuItemSchema),
});

export type LancamentoCcuResponse = z.infer<typeof LancamentoCcuResponseSchema>;
export type LancamentoCcu         = LancamentoCcuResponse['Data'][number];