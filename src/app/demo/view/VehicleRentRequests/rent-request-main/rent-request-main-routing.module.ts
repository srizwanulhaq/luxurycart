import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentRequestMainComponent } from './rent-request-main.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Vehicles Rent Request'
  },
  children: [
    {
      path: '',
      redirectTo: 'rent-request'
    },
    {
      path: 'rent-request-main',
      component: RentRequestMainComponent,
      data: {
        title: 'Vehicles Rent Request'
      }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentRequestMainRoutingModule { }
