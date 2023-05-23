
import { DishComponent } from "./dish.component";
import { DishRoutingModule } from "./dish-routing-module";
import { MainModule } from "@app/main/main.module";
import { NgModule } from "@angular/core";
import { CreateOrEditDishComponent } from "./create-or-edit-dish.component";



@NgModule({
    declarations: [
        DishComponent,
        CreateOrEditDishComponent
    ],
    imports: [
         DishRoutingModule,
            MainModule
        ],
})

export class DishModule {
    
}
