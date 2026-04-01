import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LancamentoCcuResponseSchema, LancamentoCcu } from '../models/lancamento-ccu.schema';
import { LancamentoCcuFilter } from '../models/lancamento-ccu-filter.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LancamentoCcuService {
  private http   = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/LancamentoCcu/ObterListaLancamentos`;

  pesquisar(filters: LancamentoCcuFilter): Observable<LancamentoCcu[]> {
    const params = Object.entries(filters)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .reduce((acc, [k, v]) => acc.set(k, String(v)), new HttpParams());

    return this.http.get<unknown>(this.apiUrl, { params }).pipe(
      map(raw => LancamentoCcuResponseSchema.parse(raw).Data)
    );
  }
}