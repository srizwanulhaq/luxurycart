import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectMainComponent } from './project-main.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Projects'
  },
  children: [
    {
      path: '',
      redirectTo: 'projects'
    },
    {
      path: 'projects-main',
      component: ProjectMainComponent,
      data: {
        title: 'Projects'
      }
    },
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectMainRoutingModule { }
