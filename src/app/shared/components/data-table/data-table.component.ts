import { Component, input, contentChildren, TemplateRef } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { TableColumn } from "./data-table.model";
import { Directive, Input } from "@angular/core";

@Directive({ selector: "[appTableCell]", standalone: true })
export class TableCellDirective {
  @Input("appTableCell") columnKey!: string;
  constructor(public templateRef: TemplateRef<{ $implicit: unknown }>) {}
}

@Component({
  selector: "app-data-table",
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: "./data-table.component.html",
})
export class DataTableComponent<T extends object> {
  columns = input.required<TableColumn[]>();
  rows = input<T[]>([]);
  loading = input<boolean>(false);
  emptyMessage = input<string>("Nenhum registro encontrado.");
  cellTemplates = contentChildren(TableCellDirective);

  getTemplate(key: string): TemplateRef<unknown> | null {
    const directive = this.cellTemplates().find((t) => t.columnKey === key);
    return directive?.templateRef ?? null;
  }

  getValue(row: T, key: string): unknown {
    return (row as Record<string, unknown>)[key];
  }
}
