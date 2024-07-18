import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventTicketTypeMainRoutingModule } from './event-ticket-type-main-routing.module';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessageModule } from 'primeng/message';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SharedModule } from 'src/app/shared modules/shared.module';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { EventTicketTypeListingComponent } from '../event-ticket-type-listing/event-ticket-type-listing.component';
import { AddNewEventTicketTypeComponent } from '../add-new-event-ticket-type/add-new-event-ticket-type.component';
import { EditEventTicketTypeComponent } from '../edit-event-ticket-type/edit-event-ticket-type.component';
import { EventTicketTypeMainComponent } from './event-ticket-type-main.component';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';

@NgModule({
  declarations: [
    EventTicketTypeListingComponent,
    AddNewEventTicketTypeComponent,
    EditEventTicketTypeComponent,
    EventTicketTypeMainComponent
  ],
  imports: [
    CommonModule,
    EventTicketTypeMainRoutingModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    ButtonModule,
    ListboxModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    MessagesModule,
    InputSwitchModule,
    MessageModule,
    InputMaskModule,
    CheckboxModule,
    ReactiveFormsModule,
    MenuModule,
    FormsModule,
    ProgressSpinnerModule,
    SharedModule,
    SidebarModule,
    TabViewModule,
    DateRangeComponentModule
  ]
})
export class EventTicketTypeMainModule { }
