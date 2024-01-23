import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackagesMainComponent } from './packages-main.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Tour Packages'
  },
  children: [
    {
      path: '',
      redirectTo: 'packages'
    },
    {
      path: 'tour-packages-main',
      component: PackagesMainComponent,
      data: {
        title: 'Tour Packages'
      }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackagesMainRoutingModule { }
