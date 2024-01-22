import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TourPointSlotsMainRoutingModule } from './tour-point-slots-main-routing.module';
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
import { TourPointSlotsCreateComponent } from '../tour-point-slots-create/tour-point-slots-create.component';
import { TourPointSlotsDetailsComponent } from '../tour-point-slots-details/tour-point-slots-details.component';
import { TourPointSlotsMainComponent } from './tour-point-slots-main.component';
import { TourPointSlotsListComponent } from '../tour-point-slots-list/tour-point-slots-list.component';
import { TourPointSlotsEditComponent } from '../tour-point-slots-edit/tour-point-slots-edit.component';
@NgModule({
  declarations: [
    TourPointSlotsCreateComponent,
    TourPointSlotsDetailsComponent,
    TourPointSlotsMainComponent,
    TourPointSlotsListComponent,
    TourPointSlotsEditComponent],
  imports: [
    CommonModule,
    TourPointSlotsMainRoutingModule,
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
    DateRangeComponentModule
  ]
})
export class TourPointSlotsMainModule { }
