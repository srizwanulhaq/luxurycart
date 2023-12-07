import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerRevenueMainRoutingModule } from './partner-revenue-main-routing.module';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
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
import { PartnerRevenueMainComponent } from './partner-revenue-main.component';
import { PartnerRevenueComponent } from '../partner-revenue/partner-revenue.component';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [PartnerRevenueMainComponent,PartnerRevenueComponent],
  imports: [
    CommonModule,
    PartnerRevenueMainRoutingModule,
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
    InputTextModule,
    InputSwitchModule,
    DateRangeComponentModule,
    CalendarModule,
    ChartModule
  ]
})
export class PartnerRevenueMainModule { }
