import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PushNotificationMainComponent } from './pnoti-main.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Push Notifications'
        },
        children: [
            {
                path: '',
                redirectTo: 'push-notifications'
            },
            {
                path: 'push-notification-main',
                component: PushNotificationMainComponent,
                data: {
                    title: 'Push Notifications'
                }
            },
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PushNotificationMainRoutingModule { }
