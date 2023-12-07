import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerRevenueMainComponent } from './partner-revenue-main.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Partner Revenue'
  },
  children: [
    {
      path: '',
      redirectTo: 'partner-revenue'
    },
    {
      path: 'partner-revenue-main',
      component: PartnerRevenueMainComponent,
      data: {
        title: 'Partner Revenue'
      }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerRevenueMainRoutingModule { }
