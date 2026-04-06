import { Component, input, output, computed } from '@angular/core';

@Component({
  selector: 'app-paginacao',
  standalone: true,
  templateUrl: './paginacao.component.html',
})
export class PaginacaoComponent {
  paginaAtual   = input.required<number>();
  totalPaginas  = input.required<number>();
  totalElements = input.required<number>();
  pageSize      = input<number>(10);
  loading       = input<boolean>(false);

  paginaMudou = output<number>();

  paginas = computed(() => {
    const total  = this.totalPaginas();
    const atual  = this.paginaAtual();
    const delta  = 2; // páginas antes e depois da atual

    const inicio = Math.max(1, atual - delta);
    const fim    = Math.min(total, atual + delta);

    return Array.from({ length: fim - inicio + 1 }, (_, i) => inicio + i);
  });

  irPara(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas() || pagina === this.paginaAtual()) return;
    this.paginaMudou.emit(pagina);
  }
}