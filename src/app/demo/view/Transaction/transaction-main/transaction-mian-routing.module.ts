import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionMainComponent } from './transaction-main.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Transactions'
    },
    children: [
      {
        path: '',
        redirectTo: 'transactions'
      },
      {
        path: 'transaction-main',
        component: TransactionMainComponent,
        data: {
          title: 'Transactions'
        }
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionMainRoutingModule { }
