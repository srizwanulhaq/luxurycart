import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyMainComponent } from './survey-main.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Hajj Survey'
    },
    children: [
      {
        path: '',
        redirectTo: 'survey'
      },
      {
        path: 'survey-main',
        component: SurveyMainComponent,
        data: {
          title: 'Hajj Survey'
        }
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyMainRoutingModule { }
