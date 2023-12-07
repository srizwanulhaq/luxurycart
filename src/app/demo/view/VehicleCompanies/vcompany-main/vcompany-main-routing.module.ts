import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleCompanyMainComponent } from './vcompany-main.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'vehicle-company'
        },
        children: [
            {
                path: '',
                redirectTo: 'vehicle-company-main'
            },
            {
                path: 'vehicle-company-main',
                component: VehicleCompanyMainComponent,
                data: {
                    title: 'Vehicle Company'
                }
            },
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VehicleCompanyMainRoutingModule { }

