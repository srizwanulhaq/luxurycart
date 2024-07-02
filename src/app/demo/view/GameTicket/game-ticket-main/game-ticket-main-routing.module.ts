import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameTicketMainComponent } from './game-ticket-main.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'GameTicket'
    },
    children: [
      {
        path: '',
        redirectTo: 'gameTicket-main'
      },
      {
        path: 'gameTicket-main',
        component: GameTicketMainComponent,
        data: {
          title: 'GameTicket'
        }
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameTicketMainRoutingModule { }
