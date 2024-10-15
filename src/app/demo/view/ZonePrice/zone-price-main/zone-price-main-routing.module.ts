
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZonePriceMainComponent } from './zone-price-main.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'ZonePrice'
    },
    children: [
      {
        path: '',
        redirectTo: 'ZonePrice'
      },
      {
        path: 'zone-price-main',
        component: ZonePriceMainComponent,
        data: {
          title: 'ZonePrice'
        }
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZonePriceMainRoutingModule { }
