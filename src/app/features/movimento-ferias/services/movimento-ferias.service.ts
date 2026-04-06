import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import {
  MovimentoFeriasResponseSchema,
  MovimentoFerias,
  MovimentoFeriasPagination,
} from "../models/movimento-ferias.schema";
import { MovimentoFeriasFilter } from "../models/movimento-ferias-filter.model";
import {
  MovimentoFeriasDetalhe,
  MovimentoFeriasDetalheResponseSchema,
  MovimentoFeriasIdCompostoFilter,
} from "../models/movimento-ferias-detalhe.schema";

export interface MovimentoFeriasResult {
  data: MovimentoFerias[];
  pagination: MovimentoFeriasPagination;
}

@Injectable({ providedIn: "root" })
export class MovimentoFeriasService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/movimentos/ferias/v1`;

  selecionar(
    filtros: MovimentoFeriasFilter,
  ): Observable<MovimentoFeriasResult> {
    return this.http.post<unknown>(`${this.apiUrl}/selecionar`, filtros).pipe(
      map((raw) => {
        const parsed = MovimentoFeriasResponseSchema.parse(raw);
        return {
          data: parsed.data,
          pagination: parsed.pagination,
        };
      }),
    );
  }
  obter(id: string): Observable<MovimentoFeriasDetalhe | null> {
    return this.http.get<unknown>(`${this.apiUrl}/obter/${id}`).pipe(
      map((raw) => MovimentoFeriasDetalheResponseSchema.parse(raw).data),
    );
  }

  obterPorIdComposto(
    filtro: MovimentoFeriasIdCompostoFilter,
  ): Observable<MovimentoFeriasDetalhe | null> {
    return this.http
      .post<unknown>(`${this.apiUrl}/obter-idcomposto`, filtro)
      .pipe(map((raw) => MovimentoFeriasDetalheResponseSchema.parse(raw).data));
  }
}
