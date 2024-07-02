import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventTicketMainComponent } from './event-ticket-main.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'EventTicket'
    },
    children: [
      {
        path: '',
        redirectTo: 'eventTicket-main'
      },
      {
        path: 'eventTicket-main',
        component: EventTicketMainComponent,
        data: {
          title: 'EventTicket'
        }
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventTicketMainRoutingModule { }
