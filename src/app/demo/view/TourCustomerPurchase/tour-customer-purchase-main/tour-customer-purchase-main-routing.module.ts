import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourCustomerPurchaseMainComponent } from './tour-customer-purchase-main.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Tour Customer Purchase'
  },
  children: [
    {
      path: '',
      redirectTo: 'customer-purchase'
    },
    {
      path: 'tour-customer-purchase-main',
      component: TourCustomerPurchaseMainComponent,
      data: {
        title: 'Tour Customer Purchase'
      }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourCustomerPurchaseMainRoutingModule { }
