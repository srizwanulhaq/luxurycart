import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TourCustomerPurchaseMainRoutingModule } from './tour-customer-purchase-main-routing.module';
import { TourCustomerPurchaseListingComponent } from '../tour-customer-purchase-listing/tour-customer-purchase-listing.component';
import { TourCustomerPurchaseMainComponent } from './tour-customer-purchase-main.component';
import { TourCustomerPurchaseDetailsComponent } from '../tour-customer-purchase-details/tour-customer-purchase-details.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessageModule } from 'primeng/message';


@NgModule({
  declarations: [
    TourCustomerPurchaseListingComponent,
    TourCustomerPurchaseMainComponent,
    TourCustomerPurchaseDetailsComponent
  ],
  imports: [
    CommonModule,
    TourCustomerPurchaseMainRoutingModule,
    TableModule,
    TabViewModule,
    PanelModule,
    ButtonModule,
    ToolbarModule,
    DialogModule,
    ToastModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    RippleModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    DropdownModule,
    SidebarModule,
    PanelModule,
    InputTextModule,
    InputSwitchModule,
    DateRangeComponentModule,
    MultiSelectModule
  ]
})
export class TourCustomerPurchaseMainModule { }
