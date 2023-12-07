import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleHeadCountMainComponent } from './vehicle-hc-main.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Vehicle Head Count'
        },
        children: [
            {
                path: '',
                redirectTo: 'vehicle-head-count-main'
            },
            {
                path: 'vehicle-head-count-main',
                component: VehicleHeadCountMainComponent,
                data: {
                    title: 'Vehicle Head Count'
                }
            },
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VehicleHeadCountMainRoutingModule { }
