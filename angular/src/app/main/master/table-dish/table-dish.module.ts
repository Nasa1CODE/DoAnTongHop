import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { TableDishComponent } from "./table-dish.component";
import { TableRoutingModule } from "./table-dish-routing-module";
import { TableModule } from "primeng/table";





@NgModule({
    declarations: [
        TableDishComponent, 
      
    ],
    imports: [
         TableRoutingModule,
            TableModule
        ],
    schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class TableDishModule {
    
}
