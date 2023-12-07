import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTrackMainComponent } from './usert-main.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'user-track'
        },
        children: [
            {
                path: '',
                redirectTo: 'user-track-main'
            },
            {
                path: 'user-track-main',
                component: UserTrackMainComponent,
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
export class UserTrackMainRoutingModule { }
