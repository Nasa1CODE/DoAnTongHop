import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { TableModule } from "primeng/table";
import { EmployeeComponent } from "./employee.component";
import { EmployeeRoutingModule } from "./employee-routing-module";


@NgModule({
    declarations: [
        EmployeeComponent, 
    ],
    imports: [
         EmployeeRoutingModule,
            TableModule
        ],
    schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class EmployeeModule {
    
}
