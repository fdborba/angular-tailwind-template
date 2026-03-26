import { Component } from "@angular/core";
import { PageBreadcrumbComponent } from "../../../shared/components/common/page-breadcrumb/page-breadcrumb.component";
import { ComponentCardComponent } from "../../../shared/components/common/component-card/component-card.component";
import { LabelComponent } from "../../../shared/components/form/label/label.component";
import { InputFieldComponent } from "../../../shared/components/form/input/input-field.component";
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";

@Component({
  selector: "app-crud-inicial",
  imports: [
    PageBreadcrumbComponent,
    ComponentCardComponent,
    LabelComponent,
    InputFieldComponent,
    ButtonComponent,
  ],
  templateUrl: "./crud-inicial.html",
  styles: ``,
})
export class CrudInicialComponent {
  handleSave() {
    console.log("Saving changes...");
  }
}
