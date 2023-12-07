import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityLoggingMainComponent } from './activityl-main.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Activity Loggings'
        },
        children: [
            {
                path: '',
                redirectTo: 'activity-loggings'
            },
            {
                path: 'activity-logging-main',
                component: ActivityLoggingMainComponent,
                data: {
                    title: 'Activity Loggings'
                }
            },
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ActivityLoggingMainRoutingModule { }
