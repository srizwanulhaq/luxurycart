import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { IconService } from 'src/app/demo/service/iconservice';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { StatsReportComponent } from './statsr.component';
import { StatsReportRoutingModule } from './statsr-routing.module';
import { ChartModule } from 'primeng/chart';
import { StatsReportService } from '../../service/StatsReportService';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import * as CanvasJSAngularChart from "../../../../assets/canvasJs/canvasjs.angular.component";
import { StatsModalComponent } from './statsr-modal.component';
const CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
    declarations: [
        StatsReportComponent,
        StatsModalComponent,
        CanvasJSChart
    ],
    imports: [
        CommonModule,
        TableModule,
        TabViewModule,
        PanelModule,
        ButtonModule,
        ToolbarModule,
        DynamicDialogModule,
        AutoCompleteModule,
        FormsModule,
        ReactiveFormsModule,
        RippleModule,
        ProgressSpinnerModule,
        SidebarModule,
        StatsReportRoutingModule,
        SidebarModule,
        ChartModule,
        CalendarModule,
        DropdownModule
    ],
    providers: [
        StatsReportService,
        IconService,
        MessageService,
        DialogService
    ]
})
export class StatsReportModule { }
