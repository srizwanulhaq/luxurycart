import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleMainComponent } from './role-main.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Roles' },
    children: 
    [
      {
        path: '', redirectTo: 'roles'
      },
      {
        path: 'role-main', component: RoleMainComponent,
        data: {
          title: 'Roles'
        }
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleMainRoutingModule { }
