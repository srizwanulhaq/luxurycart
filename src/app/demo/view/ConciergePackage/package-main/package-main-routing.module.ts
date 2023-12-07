import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageMainComponent } from './package-main.component';

const routes: Routes = [
  {
    path: '',
  data: {
    title: 'Packages'
  },
  children: [
    {
      path: '',
      redirectTo: 'concierge-package'
    },
    {
      path: 'concierge-package-main',
      component: PackageMainComponent,
      data: {
        title: 'Booths'
      }
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageMainRoutingModule { }
