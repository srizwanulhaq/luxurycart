import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingCommandMainComponent } from './pending-command-main.component';

const routes: Routes = [
  {
      path: '',
      data: {
          title: 'PendingCommand'
      },
      children: [
          {
              path: 'pendingCommand',
              redirectTo: 'pending-command-main'
          },
          {
              path: 'pending-command-main',
              component: PendingCommandMainComponent,
              data: {
                  title: 'PendingCommand'
              }
          },
      ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingCommandMainRoutingModule { }
