import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { EmployeeComponent } from "./employee.component";



const routes: Routes = [{
    path: '',
    component: EmployeeComponent,
    pathMatch: 'full'
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmployeeRoutingModule {}
