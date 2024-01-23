import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TourSlotsMainRoutingModule } from './tour-slots-main-routing.module';
import { TourSlotsMainComponent } from './tour-slots-main.component';
import { TourSlotsListComponent } from '../tour-slots-list/tour-slots-list.component';
import { TourSlotsEditComponent } from '../tour-slots-edit/tour-slots-edit.component';
import { TourSlotsAddComponent } from '../tour-slots-add/tour-slots-add.component';
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

@NgModule({
  declarations: [TourSlotsMainComponent,TourSlotsListComponent,TourSlotsEditComponent,
    TourSlotsAddComponent],
  imports: [
    CommonModule,
    TourSlotsMainRoutingModule,
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
 
  ]
})
export class TourSlotsMainModule { }
