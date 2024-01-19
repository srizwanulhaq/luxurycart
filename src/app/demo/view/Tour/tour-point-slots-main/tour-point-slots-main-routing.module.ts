import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourPointSlotsMainComponent } from './tour-point-slots-main.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Tour Points Slots'
  },
  children: [
    {
      path: '',
      redirectTo: 'slots'
    },
    {
      path: 'tour_points_slots-main',
      component: TourPointSlotsMainComponent,
      data: {
        title: 'Tour Points Slots'
      }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourPointSlotsMainRoutingModule { }
