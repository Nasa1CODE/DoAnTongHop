import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { TableModule } from "primeng/table";
import { DishComponent } from "./dish.component";
import { DishRoutingModule } from "./dish-routing-module";


@NgModule({
    declarations: [
        DishComponent, 
    ],
    imports: [
         DishRoutingModule,
            TableModule
        ],
    schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class DishModule {
    
}
