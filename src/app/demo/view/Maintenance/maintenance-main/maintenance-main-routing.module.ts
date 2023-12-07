import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceMainComponent } from './maintenance-main.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Maintenance'
    },
    children: [
      {
        path: '',
        redirectTo: 'maintenance'
      },
      {
        path: 'maintenance-main',
        component: MaintenanceMainComponent,
        data: {
          title: 'Maintenance'
        }
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceMainRoutingModule { }
