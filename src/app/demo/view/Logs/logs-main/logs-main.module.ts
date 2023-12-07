import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsMainRoutingModule } from './logs-main-routing.module';


import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { RouterModule } from '@angular/router';
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
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

import { LogsListComponent } from '../logs-list/logs-list.component';

import { LogsMainComponent } from '../logs-main/logs-main.component';
import { LogsDetailsComponent } from '../logs-details/logs-details.component';


import { IconService } from 'src/app/demo/service/iconservice';
import { LogsService } from 'src/app/demo/service/logs.service';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';

@NgModule({
  declarations: [LogsListComponent,LogsMainComponent,LogsDetailsComponent],
  imports: [
    CommonModule,
    LogsMainRoutingModule,
    
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
        PanelModule,
        DateRangeComponentModule,
        CheckboxModule,
        InputTextModule,
  ],
  providers: [
    LogsService,
      IconService,
      MessageService
  ]
})
export class LogsMainModule { }
