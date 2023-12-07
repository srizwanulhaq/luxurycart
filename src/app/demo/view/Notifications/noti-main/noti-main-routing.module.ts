import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationMainComponent } from './noti-main.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Notifications'
        },
        children: [
            {
                path: '',
                redirectTo: 'notification-main'
            },
            {
                path: 'notification-main',
                component: NotificationMainComponent,
                data: {
                    title: 'Notifications'
                }
            },
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotificationMainRoutingModule { }
