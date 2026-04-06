import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthResponseSchema, LoginCredentials } from './models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http    = inject(HttpClient);
  private authUrl = `${environment.authUrl}/token/v1/obter-acesso-interno`;

  private _accessToken = signal<string | null>(null);

  readonly accessToken   = computed(() => this._accessToken());
  readonly isAutenticado = computed(() => this._accessToken() !== null);

  async login(credentials: LoginCredentials): Promise<void> {
    const response = await firstValueFrom(
      this.http
        .post<unknown>(this.authUrl, credentials)
        .pipe(map(raw => AuthResponseSchema.parse(raw)))
    );

    this._accessToken.set(response.data);
  }

  logout(): void {
    this._accessToken.set(null);
  }
}