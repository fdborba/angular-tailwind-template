import { Component, computed, input, output, signal } from "@angular/core";
import { MovimentoFeriasFilter } from "../../models/movimento-ferias-filter.model";
import { ComponentCardComponent } from "../../../../shared/components/common/component-card/component-card.component";
import { LabelComponent } from "../../../../shared/components/form/label/label.component";
import { InputFieldComponent } from "../../../../shared/components/form/input/input-field.component";
import { BarraBotoesComponent } from "../../../../shared/components/common/barra-botoes/barra-botoes.component";
import { ButtonComponent } from "../../../../shared/components/ui/button/button.component";

@Component({
  selector: "app-movimento-ferias-filter",
  standalone: true,
  templateUrl: "./movimento-ferias-filter.component.html",
  imports: [
    ComponentCardComponent,
    LabelComponent,
    InputFieldComponent,
    BarraBotoesComponent,
    ButtonComponent,
  ],
})
export class MovimentoFeriasFilterComponent {
  loading = input<boolean>(false);
  tentouPesquisar = signal(false);
  selecionar = output<MovimentoFeriasFilter>();
  limpar = output<void>();
  filtros = signal<MovimentoFeriasFilter>({
    empresa: 1,
    filial: 1,
    matricula: 0,
    removerMovsSemEfeito: true,
  });

  atualizarFiltro<K extends keyof MovimentoFeriasFilter>(
    campo: K,
    valor: MovimentoFeriasFilter[K],
  ): void {
    this.filtros.update((atual) => ({ ...atual, [campo]: valor }));
  }

  matriculaInvalida = computed(() => {
    const matricula = this.filtros().matricula;
    return !matricula || matricula <= 0;
  });

  onSelecionar(): void {
    this.tentouPesquisar.set(true);
    if (this.matriculaInvalida()) return;
    this.selecionar.emit(this.filtros());
  }

  onLimpar(): void {
    this.tentouPesquisar.set(false);
    this.filtros.set({
      empresa: 1,
      filial: 1,
      matricula: 0,
      removerMovsSemEfeito: true,
    });
    this.limpar.emit();
  }
}
