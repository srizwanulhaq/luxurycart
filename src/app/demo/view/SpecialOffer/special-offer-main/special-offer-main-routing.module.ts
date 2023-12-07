import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialOfferMainComponent } from './special-offer-main.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Special Offer'
  },
  children: [
    {
      path: '',
      redirectTo: 'special-offer'
    },
    {
      path: 'special-offer-main',
      component: SpecialOfferMainComponent,
      data: {
        title: 'Special Offer'
      }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialOfferMainRoutingModule { }
