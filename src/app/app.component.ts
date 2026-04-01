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
      Usuario: 'mpsinteg_smax',
      Senha:   'SMax9517539@!',
    });
  }
}
