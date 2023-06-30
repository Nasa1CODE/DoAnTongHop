import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { OrderComponent } from "./order.component";




const routes: Routes = [{
    path: '',
    component: OrderComponent,
    pathMatch: 'full'
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrderRoutingModule {}
