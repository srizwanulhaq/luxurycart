import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatsReportComponent } from './statsr.component';

const routes: Routes = [
    {
        path: '',
        component: StatsReportComponent,
        data: {
            title: 'Stats Report'
        }
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StatsReportRoutingModule { }
