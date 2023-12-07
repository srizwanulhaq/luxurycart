import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionMainRoutingModule } from './transaction-mian-routing.module';
import { TransactionMainComponent } from '../transaction-main/transaction-main.component';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { TabViewModule } from 'primeng/tabview';
import { MessageModule } from 'primeng/message';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { TransactionDetailsComponent } from '../transaction-details/transaction-details.component';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';

@NgModule({
    declarations: [
        TransactionMainComponent,
        TransactionListComponent,
        TransactionDetailsComponent
    ],
    imports: [
        CommonModule,
        TransactionMainRoutingModule,
        TableModule,
        DialogModule,
        ButtonModule,
        ToastModule,
        InputTextModule,
        ProgressBarModule,
        HttpClientModule,
        MessagesModule,
        InputSwitchModule,
        MessageModule,
        TabMenuModule,
        TabViewModule,
        FormsModule,
        SharedModule,
        ToolbarModule,
        RippleModule,
        ProgressSpinnerModule,
        SidebarModule,
        CalendarModule,
        DateRangeComponentModule
    ]
})
export class TransactionMainModule { }
