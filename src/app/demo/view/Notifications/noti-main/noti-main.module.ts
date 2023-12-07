import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationMainRoutingModule } from './noti-main-routing.module';
import { TableModule } from 'primeng/table';
import { NotificationMainComponent } from './noti-main.component';
import { NotificationListingComponent } from '../noti-listing/noti-listing.component';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { IconService } from 'src/app/demo/service/iconservice';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { NotificationService } from 'src/app/demo/service/notification.service';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';
@NgModule({
    declarations: [
        NotificationMainComponent,
        NotificationListingComponent
    ],
    imports: [
        CommonModule,
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
        RippleModule,
        ConfirmDialogModule,
        ProgressSpinnerModule,
        DropdownModule,
        SidebarModule,
        DateRangeComponentModule,
        NotificationMainRoutingModule,
    ],
    providers: [
        NotificationService,
        IconService,
        MessageService,
    ]
})
export class NotificationMainModule { }
