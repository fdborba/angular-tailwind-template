import { Component } from "@angular/core";
import { PageBreadcrumbComponent } from "../../../shared/components/common/page-breadcrumb/page-breadcrumb.component";
import { ComponentCardComponent } from "../../../shared/components/common/component-card/component-card.component";
import { LabelComponent } from "../../../shared/components/form/label/label.component";
import { InputFieldComponent } from "../../../shared/components/form/input/input-field.component";
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";
import { BarraBotoes } from "../../../shared/components/common/barra-botoes/barra-botoes";

@Component({
  selector: "app-crud-inicial",
  imports: [
    PageBreadcrumbComponent,
    ComponentCardComponent,
    LabelComponent,
    InputFieldComponent,
    ButtonComponent,
    BarraBotoes
  ],
  templateUrl: "./crud-inicial.html",
  styles: ``,
})
export class CrudInicialComponent {
  handleSave() {
    console.log("Saving changes...");
  }
}
