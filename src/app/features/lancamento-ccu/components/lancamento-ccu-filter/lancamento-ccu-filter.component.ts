import { Component, output, input, inject, signal } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, FormGroup } from "@angular/forms";
import { LancamentoCcuFilter } from "../../models/lancamento-ccu-filter.model";
import { InputFieldComponent } from "../../../../shared/components/form/input/input-field.component";
import { LabelComponent } from "../../../../shared/components/form/label/label.component";
import { SelectComponent } from "../../../../shared/components/form/select/select.component";

@Component({
  selector: "app-lancamento-ccu-filter",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputFieldComponent,
    LabelComponent,
    SelectComponent,
  ],
  templateUrl: "./lancamento-ccu-filter.component.html",
})
export class LancamentoCcuFilterComponent {
  pesquisar = output<LancamentoCcuFilter>();
  limpar = output<void>();
  loading = input<boolean>(false);

  filtros = signal<LancamentoCcuFilter>({
    codigo: "",
    statusId: 0,
  });

  atualizarFiltro<K extends keyof LancamentoCcuFilter>(
    campo: K,
    valor: LancamentoCcuFilter[K]
  ): void {
    this.filtros.update((atual) => ({ ...atual, [campo]: valor }));
  }

  onPesquisar(): void {
    const filtrosLimpos = Object.fromEntries(
      Object.entries(this.filtros()).filter(
        ([, v]) => v !== null && v !== "" && v !== undefined
      )
    ) as LancamentoCcuFilter;
    console.log('2.', filtrosLimpos);
    this.pesquisar.emit(filtrosLimpos);
  }

  onLimpar(): void {
    this.filtros.set({ codigo: "", statusId: 0 });
    this.limpar.emit();
  }

  statusArray = [
    { value: "0", label: "Todos" },
    { value: "1", label: "Pendente Integração" },
    { value: "2", label: "Lançamento Atrasado" },
    { value: "3", label: "Lançamento Editado" },
    { value: "4", label: "Integrado" },
  ];
}
