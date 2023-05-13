
import { EmployeeRoutingModule } from "./employee-routing-module";
import { CreateOrEditEmployeeComponent } from "./create-or-edit-employee.component";
import { MainModule } from "@app/main/main.module";
import { AppCommonModule } from "@app/shared/common/app-common.module";
import { NgModule } from "@angular/core";
import { EmployeeComponent } from "./employee.component";

@NgModule({
    declarations: [
        EmployeeComponent,
        CreateOrEditEmployeeComponent
    ],
    imports: [
        AppCommonModule,
        EmployeeRoutingModule,
        MainModule,
    ],

})

export class EmployeeModule {

}
