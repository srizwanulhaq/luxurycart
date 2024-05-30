import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventMainComponent } from './event-main.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Event'
    },
    children: [
      {
        path: '',
        redirectTo: 'event-main'
      },
      {
        path: 'event-main',
        component: EventMainComponent,
        data: {
          title: 'Event'
        }
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventMainRoutingModule { }
