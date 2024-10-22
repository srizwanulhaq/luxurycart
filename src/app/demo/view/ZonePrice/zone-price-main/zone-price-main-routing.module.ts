import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZonePriceMainComponent } from './zone-price-main.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Zone'
  },
  children: [
    {
      path: '',
      redirectTo: 'zoneprice'
    },
    {
      path: 'zone-price-main',
      component: ZonePriceMainComponent,
      data: {
        title: 'Zone'
      }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZonePriceMainRoutingModule { }
