import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoothMainComponent } from './booth-main.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Booths'
  },
  children: [
    {
      path: '',
      redirectTo: 'booths'
    },
    {
      path: 'booth-main',
      component: BoothMainComponent,
      data: {
        title: 'Booths'
      }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoothMainRoutingModule { }
