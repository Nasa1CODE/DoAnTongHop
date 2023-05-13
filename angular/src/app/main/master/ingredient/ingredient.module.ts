import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MainModule } from "@app/main/main.module";
import { FormsModule } from "@angular/forms";
import { IngredientComponent } from "./ingredient.component";
import { IngredientRoutingModule } from "./ingredient-routing-module";
import { AppCommonModule } from "@app/shared/common/app-common.module";





@NgModule({
    declarations: [
        IngredientComponent, 
      
    ],
    imports: [
        IngredientRoutingModule,
        MainModule,
        FormsModule,
        AppCommonModule 
    ],
    schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class IngredientModule {
    
}
