import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { IconService } from 'src/app/demo/service/iconservice';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { ActivityLoggingMainComponent } from './activityl-main.component';
import { ActivityLoggingListingComponent } from '../activityl-listing/activityl-listing.component';
import { ActivityLoggingMainRoutingModule } from './activityl-main-routing.module';
import { ActivityLoggingService } from 'src/app/demo/service/activityLoggingService';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [
        ActivityLoggingMainComponent,
        ActivityLoggingListingComponent
    ],
    imports: [
        CommonModule,
        TableModule,
        TabViewModule,
        PanelModule,
        ButtonModule,
        ToolbarModule,
        DialogModule,
        AutoCompleteModule,
        FormsModule,
        ConfirmDialogModule,
        ToastModule,
        ReactiveFormsModule,
        RippleModule,
        ProgressSpinnerModule,
        SidebarModule,
        ActivityLoggingMainRoutingModule,
        SidebarModule
    ],
    providers: [
        ActivityLoggingService,
        IconService,
        MessageService
    ]
})
export class ActivityLoggingMainComponentMainModule { }
