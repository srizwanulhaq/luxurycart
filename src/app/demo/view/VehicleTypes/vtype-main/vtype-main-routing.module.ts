import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleTypeMainComponent } from './vtype-main.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'vehicle-type'
        },
        children: [
            {
                path: '',
                redirectTo: 'vehicle-type-main'
            },
            {
                path: 'vehicle-type-main',
                component: VehicleTypeMainComponent,
                data: {
                    title: 'Vehicle Type'
                }
            },
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VehicleTypeMainRoutingModule { }

