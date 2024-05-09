import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketTypeMainRoutingModule } from './ticket-type-main-routing.module';
import { TicketTypeMainComponent } from './ticket-type-main.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TicketTypeListComponent } from '../ticket-type-list/ticket-type-list.component';
import { AddTicketTypeComponent } from '../add-ticket-type/add-ticket-type.component';
import { EditTicketTypeComponent } from '../edit-ticket-type/edit-ticket-type.component';
import { TicketTypeService } from 'src/app/demo/service/ticket-type.service';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    TicketTypeMainComponent,
    TicketTypeListComponent,
    AddTicketTypeComponent,
    EditTicketTypeComponent
  ],
  imports: [
    CommonModule,
    TicketTypeMainRoutingModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    MessageModule,
    ToastModule,
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DialogModule,
    RippleModule,
    ProgressSpinnerModule,
  ],
  providers: [
    TicketTypeService, MessageService
]
})
export class TicketTypeMainModule { }
