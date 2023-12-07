import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitPlaceMainComponent } from './visit-place-main.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Visit Place'
  },
  children: [
    {
      path: '',
      redirectTo: 'visit-place'
    },
    {
      path: 'visit-place-main',
      component: VisitPlaceMainComponent,
      data: {
        title: 'Visit Place'
      }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitPlaceMainRoutingModule { }
