import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestMainComponent } from './request-main.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Concierge Request'
    },
    children: [
      {
        path: '',
        redirectTo: 'concierge-request'
      },
      {
        path: 'concierge-request-main',
        component: RequestMainComponent,
        data: {
          title: 'Concierge Request'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestMainRoutingModule { }
