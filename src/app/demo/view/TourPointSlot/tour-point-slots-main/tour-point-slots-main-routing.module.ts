import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourPointSlotsMainComponent } from './tour-point-slots-main.component';


const routes: Routes = [{
  path: '',
  data: {
    title: 'Tour Point Slots'
  },
  children: [
    {
      path: '',
      redirectTo: 'points-slots'
    },
    {
      path: 'tour_point_slots-main',
      component: TourPointSlotsMainComponent,
      data: {
        title: 'Tour Point Slots'
      }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourPointSlotsMainRoutingModule { }
