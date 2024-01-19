import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TourPointSlotsMainRoutingModule } from './tour-point-slots-main-routing.module';
import { TourSlotsAddComponent } from './tour-slots-add/tour-slots-add.component';
import { TourPointSlotsMainComponent } from './tour-point-slots-main.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TourSlotsListComponent } from './tour-slots-list/tour-slots-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [TourSlotsAddComponent, TourPointSlotsMainComponent, TourSlotsListComponent],
  imports: [
    CommonModule,
    TourPointSlotsMainRoutingModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    MessagesModule,
    TableModule
  ],
  providers:[
    MessageService
  ]
})
export class TourPointSlotsMainModule { }
