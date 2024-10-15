import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourMainComponent } from './tour-main.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tour'
    },
    children: [
      {
        path: '',
        redirectTo: 'tour'
      },
      {
        path: 'tour-main',
        component: TourMainComponent,
        data: {
          title: 'Tour'
        }
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourMainRoutingModule { }

