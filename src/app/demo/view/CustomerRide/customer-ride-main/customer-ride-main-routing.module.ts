import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerRideMainModule } from './customer-ride-main.module';
import { CustomerRideMainComponent } from './customer-ride-main.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Customers Ride'
    },
    children: [
      {
        path: '',
        redirectTo: 'customer-ride'
      },
      {
        path: 'customer-ride-main',
        component: CustomerRideMainComponent,
        data: {
          title: 'Customers Ride'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRideMainRoutingModule { }
