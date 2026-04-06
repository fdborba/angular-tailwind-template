import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Angular Ecommerce Dashboard | TailAdmin';

  private authService = inject(AuthService);

  async ngOnInit(): Promise<void> {
  await this.authService.login({
    identificador: '0dcbd330-cdfe-4282-8ce1-260bd19a1a36',
    login:         'shfdelphi',
    password:      'kwD+SmFrMCk6HI7YUtbwBM5QpSnGYmWB',
    usuarioLog:    '8888888',
    usuarioTipos:  [3],
    usuarioRoles:  ['MPS_Analistas'],
  });
}
}
