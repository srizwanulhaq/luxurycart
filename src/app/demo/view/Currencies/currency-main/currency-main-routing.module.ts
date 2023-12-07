import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyMainComponent } from './currency-main.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Currency'
    },
    children: [
      {
        path: '',
        redirectTo: 'currency'
      },
      {
        path: 'currency-main',
        component: CurrencyMainComponent,
        data: {
          title: 'Currency'
        }
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyMainRoutingModule { }
