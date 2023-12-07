import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryMainComponent } from './country-main.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Counrty'
    },
    children: [
      {
        path: '',
        redirectTo: 'country'
      },
      {
        path: 'country-main',
        component: CountryMainComponent,
        data: {
          title: 'Counrty'
        }
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryMainRoutingModule { }
