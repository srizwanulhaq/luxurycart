import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceMainRoutingModule } from './maintenance-main-routing.module';
import { MaintenanceListComponent } from '../maintenance-list/maintenance-list.component';
import { MaintenanceMainComponent } from './maintenance-main.component';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from "primeng/toast";
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
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MaintenanceDetailsComponent } from '../maintenance-details/maintenance-details.component';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';

@NgModule({
    declarations: [MaintenanceListComponent, MaintenanceMainComponent, MaintenanceDetailsComponent],
    imports: [
        CommonModule,
        MaintenanceMainRoutingModule,
        InputSwitchModule,
        TableModule,
        TabViewModule,
        PanelModule,
        ButtonModule,
        ToolbarModule,
        DialogModule,
        AutoCompleteModule,
        ToastModule,
        FormsModule,
        ReactiveFormsModule,
        RippleModule,
        ProgressSpinnerModule,
        SidebarModule,
        SidebarModule,
        MultiSelectModule,
        DropdownModule,
        InputTextModule,
        DateRangeComponentModule
    ]
})
export class MaintenanceMainModule { }
