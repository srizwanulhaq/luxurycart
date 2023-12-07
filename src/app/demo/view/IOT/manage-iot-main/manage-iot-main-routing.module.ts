import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageIotMainComponent } from './manage-iot-main.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Iot'
    },
    children: [
      {
        path: '',
        redirectTo: 'iot'
      },
      {
        path: 'manage-iot-main',
        component: ManageIotMainComponent,
        data: {
          title: 'Iot'
        }
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageIotMainRoutingModule { }
