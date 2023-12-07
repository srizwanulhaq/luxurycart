import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerMainRoutingModule } from './partner-main-routing.module';
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
import { PartnerMainComponent } from './partner-main.component';
import { PartnerListComponent } from '../partner-list/partner-list.component';
import { PartnerCreateComponent } from '../partner-create/partner-create.component';

import {CheckboxModule} from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { PartnerDetailsComponent } from '../partner-details/partner-details.component';

@NgModule({
  declarations: [PartnerMainComponent,PartnerListComponent,PartnerCreateComponent,PartnerDetailsComponent],
  imports: [
    CommonModule,
    PartnerMainRoutingModule,
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
    CheckboxModule,
    MultiSelectModule

  ]
})
export class PartnerMainModule { }
