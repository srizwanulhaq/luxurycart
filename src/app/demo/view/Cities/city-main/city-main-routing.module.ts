import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityMainComponent } from './city-main.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'City'
    },
    children: [
      {
        path: '',
        redirectTo: 'city'
      },
      {
        path: 'city-main',
        component: CityMainComponent,
        data: {
          title: 'City'
        }
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityMainRoutingModule { }
