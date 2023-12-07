import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RideMainComponent } from './ride-main.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Rides'
    },
    children: [
      {
        path: '',
        redirectTo: 'rides'
      },
      {
        path: 'ride-main',
        component: RideMainComponent,
        data: {
          title: 'Rides'
        }
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RideMainRoutingModule { }
