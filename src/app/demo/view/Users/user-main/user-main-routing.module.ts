import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserMainComponent } from './user-main.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Users' },
    children: 
    [
      {
        path: '', redirectTo: 'users'
      },
      {
        path: 'user-main', component: UserMainComponent,
        data: {
          title: 'Users'
        }
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserMainRoutingModule { }
