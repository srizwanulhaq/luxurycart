import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRideMainRoutingModule } from './customer-ride-main-routing.module';
import { CustomerRideMainComponent } from './customer-ride-main.component';
import { CustomerRideService } from 'src/app/demo/service/customer-ride.service';
import { IconService } from 'src/app/demo/service/iconservice';
import { MessageService } from 'primeng/api';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';
import { SidebarModule } from 'primeng/sidebar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
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


@NgModule({
  declarations: [CustomerRideMainComponent],
  imports: [
    CommonModule,
    CustomerRideMainRoutingModule,
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
        ProgressSpinnerModule,
        SidebarModule,
        DateRangeComponentModule
  ],
  providers: [
    CustomerRideService,
    IconService,
    MessageService
]
})
export class CustomerRideMainModule { }
