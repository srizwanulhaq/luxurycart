import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapMainComponent } from './map-main.component';

const routes: Routes = [
  {
      path: '',
      data: {
          title: 'Maps'
      },
      children: [
          {
              path: 'map',
              redirectTo: 'map-main'
          },
          {
              path: 'map-main',
              component: MapMainComponent,
              data: {
                  title: 'Maps'
              }
          },
      ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapMainRoutingModule { }
