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
