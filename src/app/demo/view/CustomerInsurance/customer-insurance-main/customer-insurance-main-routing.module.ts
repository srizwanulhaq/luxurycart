import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerInsuranceMainComponent } from './customer-insurance-main.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Customer Insurance'
    },
    children: [
      {
        path: '',
        redirectTo: 'customer-insurance'
      },
      {
        path: 'customer-insurance-main',
        component: CustomerInsuranceMainComponent,
        data: {
          title: 'Customer Insurance'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerInsuranceMainRoutingModule { }
