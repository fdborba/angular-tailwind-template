import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  MovimentoFeriasResponseSchema,
  MovimentoFerias,
  MovimentoFeriasPagination
} from '../models/movimento-ferias.schema';
import { MovimentoFeriasFilter } from '../models/movimento-ferias-filter.model';

export interface MovimentoFeriasResult {
  data:       MovimentoFerias[];
  pagination: MovimentoFeriasPagination;
}

@Injectable({ providedIn: 'root' })
export class MovimentoFeriasService {
  private http   = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/movimentos/ferias/v1/selecionar`;

  selecionar(filtros: MovimentoFeriasFilter): Observable<MovimentoFeriasResult> {
    return this.http
      .post<unknown>(this.apiUrl, filtros)
      .pipe(
        map(raw => {
          const parsed = MovimentoFeriasResponseSchema.parse(raw);
          return {
            data:       parsed.data,
            pagination: parsed.pagination,
          };
        })
      );
  }
}