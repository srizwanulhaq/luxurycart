import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingCommandMainRoutingModule } from './pending-command-main-routing.module';
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
import { PendingCommandListComponent } from '../pending-command-list/pending-command-list.component';
import { PendingCommandMainComponent } from './pending-command-main.component';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';
@NgModule({
  declarations: [PendingCommandListComponent,PendingCommandMainComponent],
  imports: [
    CommonModule,
    PendingCommandMainRoutingModule,
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
    DateRangeComponentModule
  ]
})
export class PendingCommandMainModule { }
