import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { TourSlotsMainRoutingModule } from './tour-slots-main-routing.module';
import { TourSlotsAddComponent } from '../tour-slots-add/tour-slots-add.component';
import { TourSlotsListComponent } from '../tour-slots-list/tour-slots-list.component';
import { TourSlotsMainComponent } from './tour-slots-main.component';
import { TourSlotsEditComponent } from '../tour-slots-edit/tour-slots-edit.component';

@NgModule({
  declarations: [TourSlotsAddComponent, 
    TourSlotsMainComponent, 
    TourSlotsListComponent, 
    TourSlotsEditComponent],
  imports: [
    CommonModule,
    TourSlotsMainRoutingModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule,
    ProgressSpinnerModule,
    InputTextModule,
  ],
  providers:[
    MessageService
  ]
})
export class TourPointSlotsMainModule { }
