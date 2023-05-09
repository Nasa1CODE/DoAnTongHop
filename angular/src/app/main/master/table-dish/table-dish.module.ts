import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { TableDishComponent } from "./table-dish.component";
import { TableRoutingModule } from "./table-dish-routing-module";
import { TableModule } from "primeng/table";
import { AgGridModule } from '@ag-grid-community/angular';
import { MainModule } from "@app/main/main.module";
import { FormsModule } from "@angular/forms";





@NgModule({
    declarations: [
        TableDishComponent, 
      
    ],
    imports: [
        TableRoutingModule,
        MainModule,
        FormsModule 
    ],
    schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class TableDishModule {
    
}
