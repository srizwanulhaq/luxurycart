import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromotionMainComponent } from './promotion-main.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Promotions'
    },
    children: [
      {
        path: '',
        redirectTo: 'promotions'
      },
      {
        path: 'promotion-main',
        component: PromotionMainComponent,
        data: {
          title: 'Promotions'
        }
      },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionMainRoutingModule { }
