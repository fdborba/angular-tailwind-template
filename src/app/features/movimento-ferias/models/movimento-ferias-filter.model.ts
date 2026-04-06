export interface MovimentoFeriasFilter {
  empresa:              number; 
  filial:               number; 
  matricula:            number; 
  removerMovsSemEfeito: boolean;
  page?:                number; 
  pageSize?:            number; 
}