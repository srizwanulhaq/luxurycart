import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameMainComponent } from './game-main.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Game'
    },
    children: [
      {
        path: '',
        redirectTo: 'game-main'
      },
      {
        path: 'game-main',
        component: GameMainComponent,
        data: {
          title: 'Game'
        }
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameMainRoutingModule { }
