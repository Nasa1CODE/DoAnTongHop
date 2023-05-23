import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MainModule } from "@app/main/main.module";
import { FormsModule } from "@angular/forms";
import { AppCommonModule } from "@app/shared/common/app-common.module";
import { InvoiceComponent } from "./invoice.component";
import { InvoiceRoutingModule } from "./invoice-routing-module";
import { AgGridModule } from "ag-grid-angular";





@NgModule({
    declarations: [
        InvoiceComponent,

    ],
    imports: [
        InvoiceRoutingModule,
        MainModule,
        FormsModule,
        //AppCommonModule,
         
    ],
    schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class InvoiceModule {
    
}
