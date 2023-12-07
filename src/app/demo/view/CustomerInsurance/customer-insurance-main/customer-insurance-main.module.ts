import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerInsuranceMainRoutingModule } from './customer-insurance-main-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { ToolbarModule } from 'primeng/toolbar';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';
import { MessageService } from 'primeng/api';
import { IconService } from 'src/app/demo/service/iconservice';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { CustomerInsuranceDetailsComponent } from '../customer-insurance-details/customer-insurance-details.component';
import { CustomerInsuranceListingComponent } from '../customer-insurance-listing/customer-insurance-listing.component';
import { CustomerInsuranceMainComponent } from './customer-insurance-main.component';
import { CustomerInsuranceRefundComponent } from '../customer-insurance-refund/customer-insurance-refund.component';


@NgModule({
  declarations: [
    CustomerInsuranceDetailsComponent,
    CustomerInsuranceListingComponent,
    CustomerInsuranceMainComponent,
    CustomerInsuranceRefundComponent
  ],
  imports: [
    CommonModule,
    CustomerInsuranceMainRoutingModule,
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
    CustomerService,
    IconService,
    MessageService
]
})
export class CustomerInsuranceMainModule { }
