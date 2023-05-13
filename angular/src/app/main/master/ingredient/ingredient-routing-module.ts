import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { IngredientComponent } from "./ingredient.component";



const routes: Routes = [{
    path: '',
    component: IngredientComponent,
    pathMatch: 'full'
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IngredientRoutingModule {}
