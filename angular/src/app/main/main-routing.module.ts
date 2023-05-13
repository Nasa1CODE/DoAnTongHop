import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'dashboard', component: DashboardComponent, data: { permission: 'Pages.Tenant.Dashboard' } },
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    {
                        path: 'master/table-dish',
                        loadChildren: () => import('./master/table-dish/table-dish.module').then(m => m.TableDishModule),
                        
                    },
                    {
                        path: 'master/employee',
                        loadChildren: () => import('./master/employee/employee.module').then(m => m.EmployeeModule),
                        
                    },
                    {
                        path: 'master/dish',
                        loadChildren: () => import('./master/dish/dish.module').then(m => m.DishModule),
                        
                    },
                    {
                        path: 'master/ingredient',
                        loadChildren: () => import('./master/ingredient/ingredient.module').then(m => m.IngredientModule),
                        
                    },
                    { path: '**', redirectTo: 'dashboard' },
                    
                ],
              
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }
