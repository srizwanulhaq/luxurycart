import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourSlotsMainComponent } from './tour-slots-main.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Tour Slots'
  },
  children: [
    {
      path: '',
      redirectTo: 'tour-slots'
    },
    {
      path: 'tour-slots-main',
      component: TourSlotsMainComponent,
      data: {
        title: 'Tour Slots'
      }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourSlotsMainRoutingModule { }
