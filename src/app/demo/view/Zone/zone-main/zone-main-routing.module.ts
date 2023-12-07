import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZoneEditComponent } from '../zone-edit/zone-edit.component';
import { ZoneMainComponent } from './zone-main.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Zones'
  },
  children: [
    {
      path: '',
      redirectTo: 'zones'
    },
    {
      path: 'zone-main',
      component: ZoneMainComponent,
      data: {
        title: 'Zones'
      }
    },
    {
      path: 'zones/zone-edit',
      component: ZoneEditComponent,
      data: {
        title: 'Zones'
      }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZoneMainRoutingModule { }
