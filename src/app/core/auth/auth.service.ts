import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthResponseSchema, LoginCredentials } from './models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private _accessToken  = signal<string | null>(null);
  private _refreshToken = signal<string | null>(null);

  readonly accessToken  = computed(() => this._accessToken());
  readonly isAutenticado = computed(() => this._accessToken() !== null);

  async login(credentials: LoginCredentials): Promise<void> {
    const response = await firstValueFrom(
      this.http
        .post<unknown>(`${this.apiUrl}/api/token/obter`, credentials)
        .pipe(
          map(raw => AuthResponseSchema.parse(raw))
        )
    );

    if (!response.Sucesso) {
      throw new Error('Credenciais inválidas');
    }
    this._accessToken.set(response.Data.Access_token);
    this._refreshToken.set(response.Data.Refresh_token);
  }

  logout(): void {
    this._accessToken.set(null);
    this._refreshToken.set(null);
  }
}