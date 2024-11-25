import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginMainComponent } from './login-main.component';
import { deleteAccountt } from './delete-account';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Login'
    },
    children: [
      {
        path: '',
        redirectTo: 'login'
      },
      {
        path: 'login-main',
        component: LoginMainComponent,
        data: {
          title: 'Login'
        }
      },
      {
        path: 'deleteAccount',
        component: deleteAccountt,
        data: {
          title: 'Delete Account'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginMainRoutingModule { }
