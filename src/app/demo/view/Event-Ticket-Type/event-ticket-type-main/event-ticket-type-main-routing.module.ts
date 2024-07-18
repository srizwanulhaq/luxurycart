import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventTicketTypeMainComponent } from './event-ticket-type-main.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Event Ticket Type'
  },
  children: [
    {
      path: '',
      redirectTo: 'event-ticket-type'
    },
    {
      path: 'event-ticket-type-main',
      component: EventTicketTypeMainComponent,
      data: {
        title: 'Event Ticket Type'
      }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventTicketTypeMainRoutingModule { }
