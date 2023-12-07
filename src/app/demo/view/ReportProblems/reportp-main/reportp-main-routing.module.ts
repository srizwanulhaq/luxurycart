import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportProblemMainComponent } from './reportp-main.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Report Problems'
        },
        children: [
            {
                path: '',
                redirectTo: 'report-problems'
            },
            {
                path: 'report-problem-main',
                component: ReportProblemMainComponent,
                data: {
                    title: 'Report Problems'
                }
            },
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportProblemMainRoutingModule { }
