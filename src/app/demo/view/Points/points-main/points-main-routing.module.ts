import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointsMainComponent } from './points-main.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Tour Points'
  },
  children: [
    {
      path: '',
      redirectTo: 'points'
    },
    {
      path: 'tour-points-main',
      component: PointsMainComponent,
      data: {
        title: 'Tour Points'
      }
    },
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PointsMainRoutingModule { }
