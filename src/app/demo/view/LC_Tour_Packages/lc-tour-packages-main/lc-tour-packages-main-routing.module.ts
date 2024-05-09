import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LCTourPackagesMainComponent } from './lc-tour-packages-main.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'lc-tour-package'
  },
  children: [
    {
      path: '',
      redirectTo: 'LC Tour Package'
    },
    {
      path: 'lc-tour-package-main',
      component: LCTourPackagesMainComponent,
      data: {
        title: 'LC Tour Package'
      }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LCTourPackagesMainRoutingModule { }
