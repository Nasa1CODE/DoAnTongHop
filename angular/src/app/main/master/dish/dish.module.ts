import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { TableModule } from "primeng/table";
import { DishComponent } from "./dish.component";
import { DishRoutingModule } from "./dish-routing-module";
import { FormsModule } from "@angular/forms";


@NgModule({
    declarations: [
        DishComponent, 
    ],
    imports: [
         DishRoutingModule,
            TableModule,
            FormsModule
        ],
    schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class DishModule {
    
}
