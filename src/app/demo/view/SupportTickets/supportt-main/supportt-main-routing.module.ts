import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportTicketMainComponent } from './supportt-main.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Support Ticket'
        },
        children: [
            {
                path: '',
                redirectTo: 'support-tickets'
            },
            {
                path: 'support-ticket-main',
                component: SupportTicketMainComponent,
                data: {
                    title: 'Support Ticket'
                }
            },
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SupportTicketMainRoutingModule { }
