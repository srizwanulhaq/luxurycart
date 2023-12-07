import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestMainRoutingModule } from './request-main-routing.module';
import { SidebarModule } from 'primeng/sidebar';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ToolbarModule } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RequestDetailsComponent } from '../request-details/request-details.component';
import { RequestListingComponent } from '../request-listing/request-listing.component';
import { RequestMainComponent } from './request-main.component';
import { MessageService } from 'primeng/api';
import { IconService } from 'src/app/demo/service/iconservice';
import { ConciergeRequestService } from 'src/app/demo/service/concierge-request.service';


@NgModule({
  declarations: [
    RequestDetailsComponent,
    RequestListingComponent,
    RequestMainComponent
  ],
  imports: [
    CommonModule,
    RequestMainRoutingModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    ConfirmDialogModule,
    MultiSelectModule,
    AutoCompleteModule,
    InputSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ToolbarModule,
    NgxIntlTelInputModule,
    PanelModule,
    TabViewModule,
    InputTextModule,
    DialogModule,
    RippleModule,
    SidebarModule,
    DateRangeComponentModule
  ],
  providers: [
    ConciergeRequestService,
    IconService,
    MessageService
]
})
export class RequestMainModule { }
