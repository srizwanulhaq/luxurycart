import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrutinyTemplateMainComponent } from './stemplate-main.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'ride-scrutiny-templates'
        },
        children: [
            {
                path: '',
                redirectTo: 'ride-scrutiny-templates-main'
            },
            {
                path: 'ride-scrutiny-templates-main',
                component: ScrutinyTemplateMainComponent,
                data: {
                    title: 'Ride Scrutiny Templates'
                }
            },
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScrutinyTemplateMainRoutingModule { }

