import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { TableDishComponent } from "./table-dish.component";



const routes: Routes = [{
    path: '',
    component: TableDishComponent,
    pathMatch: 'full'
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TableRoutingModule {}
