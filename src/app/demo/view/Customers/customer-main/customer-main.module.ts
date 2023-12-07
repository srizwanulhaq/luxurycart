import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { DialogModule } from "primeng/dialog";
import { MessageModule } from "primeng/message";
import { MessagesModule } from "primeng/messages";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from "primeng/toast";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { AutoCompleteModule } from "primeng/autocomplete";
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { GalleriaModule } from 'primeng/galleria';
import { CustomerMainRoutingModule } from './customer-main-routing.module';
import { CustomerListComponent } from '../customer-list/customer-list.component';
import { CustomerMainComponent } from './customer-main.component';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { CustomerWalletComponent } from '../customer-wallet/customer-wallet.component';
import { CustomerBonusComponent } from '../customer-bonus/customer-bonus.component';
import { CustomerSettleBonusComponent } from '../customer-settle-bonus/customer-settle-bonus.component';
import { CustomerChargeComponent } from '../customer-charge/customer-charge.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { SidebarModule } from 'primeng/sidebar';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { IconService } from 'src/app/demo/service/iconservice';
import { MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { RippleModule } from 'primeng/ripple';
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';
import { CustomerAlertsComponent } from '../customer-alerts/customer-alerts.component';
import { CustomerRideListComponent } from '../customer-ride-list/customer-ride-list.component';
import { CustomerTransactionListComponent } from '../customer-transaction-list/customer-transaction-list.component';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';

@NgModule({
    declarations: [
        CustomerListComponent,
        CustomerMainComponent,
        AddCustomerComponent,
        CustomerWalletComponent,
        CustomerBonusComponent,
        CustomerSettleBonusComponent,
        CustomerChargeComponent,
        CustomerDetailsComponent,
        CustomerEditComponent,
        CustomerAlertsComponent,
        CustomerRideListComponent,
        CustomerTransactionListComponent
    ],
    imports: [
        CommonModule,
        CustomerMainRoutingModule,
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
export class CustomerMainModule {

}
