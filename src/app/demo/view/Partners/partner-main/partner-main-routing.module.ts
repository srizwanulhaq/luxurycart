import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerMainComponent } from './partner-main.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Partners'
  },
  children: [
    {
      path: '',
      redirectTo: 'partner'
    },
    {
      path: 'partner-main',
      component: PartnerMainComponent,
      data: {
        title: 'Partners'
      }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerMainRoutingModule { }
