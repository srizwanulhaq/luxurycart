import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketTypeMainComponent } from './ticket-type-main.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Ticket Type'
  },
  children: [
    {
      path: '',
      redirectTo: 'ticket-type'
    },
    {
      path: 'ticket-type-main',
      component: TicketTypeMainComponent,
      data: {
        title: 'Ticket Type'
      }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketTypeMainRoutingModule { }
