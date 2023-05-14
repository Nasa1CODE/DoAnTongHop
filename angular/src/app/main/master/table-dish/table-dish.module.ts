import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { TableDishComponent } from "./table-dish.component";
import { TableRoutingModule } from "./table-dish-routing-module";
import { MainModule } from "@app/main/main.module";
import { FormsModule } from "@angular/forms";
import { CreateOrEditTableDishComponent } from "./create-or-edit-table-dish.component";





@NgModule({
    declarations: [
        TableDishComponent,
        CreateOrEditTableDishComponent 
      
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


