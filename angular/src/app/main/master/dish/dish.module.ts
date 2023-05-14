
import { DishComponent } from "./dish.component";
import { DishRoutingModule } from "./dish-routing-module";
import { CreateOrEditDishComponent } from "./create-or-edit-dish.component";
import { MainModule } from "@app/main/main.module";
import { NgModule } from "@angular/core";


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
