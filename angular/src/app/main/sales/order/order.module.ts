import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MainModule } from "@app/main/main.module";
import { FormsModule } from "@angular/forms";
import { OrderRoutingModule } from "./order-routing-module";
import { OrderComponent } from "./order.component";
import { CreateOrEditOrderComponent } from "./create-or-edit-order.component";






@NgModule({
    declarations: [
        OrderComponent,
        CreateOrEditOrderComponent
    ],
    imports: [
        OrderRoutingModule,
        MainModule,
        FormsModule,
        //AppCommonModule,
         
    ],
    schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class OrderModule {
    
}
