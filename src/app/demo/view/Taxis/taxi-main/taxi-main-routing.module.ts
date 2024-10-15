import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxiMainComponent } from './taxi-main.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Taxi'
    },
    children: [
      {
        path: '',
        redirectTo: 'taxi'
      },
      {
        path: 'taxi-main',
        component: TaxiMainComponent,
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
export class TaxiMainRoutingModule { }

