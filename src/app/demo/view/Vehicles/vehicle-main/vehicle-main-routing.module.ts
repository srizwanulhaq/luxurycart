import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleMainComponent } from './vehicle-main.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Vehicles'
  },
  children: [
    {
      path: '',
      redirectTo: 'vehicles'
    },
    {
      path: 'vehicle-main',
      component: VehicleMainComponent,
      data: {
        title: 'Rides'
      }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleMainRoutingModule { }
