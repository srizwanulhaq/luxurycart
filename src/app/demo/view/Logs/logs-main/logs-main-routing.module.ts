import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LogsMainComponent } from './logs-main.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Logs'
    },
    children: [
      {
        path: '',
        redirectTo: 'Logs'
      },
      {
        path: 'logs-main',
        component: LogsMainComponent,
        data: {
          title: 'Logs'
        }
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsMainRoutingModule { }
