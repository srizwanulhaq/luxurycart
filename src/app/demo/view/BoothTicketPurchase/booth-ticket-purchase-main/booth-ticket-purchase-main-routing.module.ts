import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoothTicketPurchaseMainComponent } from './booth-ticket-purchase-main.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'BoothTicketPurchase'
    },
    children: [
      {
        path: '',
        redirectTo: 'BoothTicketPurchase'
      },
      {
        path: 'booth-ticket-purchase-main',
        component: BoothTicketPurchaseMainComponent,
        data: {
          title: 'BoothTicketPurchase'
        }
      },
    ]
  }];

  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoothTicketPurchaseMainRoutingModule { }

