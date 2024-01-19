import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectMainRoutingModule } from './project-main-routing.module';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';
import { TabViewModule } from 'primeng/tabview';
import { SidebarModule } from 'primeng/sidebar';
import { SharedModule } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { GMapModule } from 'primeng/gmap';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageModule } from 'primeng/message';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessagesModule } from 'primeng/messages';
import { HttpClientModule } from '@angular/common/http';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { ProjectListingComponent } from '../project-listing/project-listing.component';
import { ProjectMainComponent } from './project-main.component';
import { ProjectCreateComponent } from '../project-create/project-create.component';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { ListboxModule } from 'primeng/listbox';


@NgModule({
  declarations: [
    ProjectListingComponent,
    ProjectMainComponent,
    ProjectCreateComponent,
    ProjectDetailsComponent,
    ProjectEditComponent
  ],
  imports: [
    CommonModule,
    ProjectMainRoutingModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ListboxModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    MessagesModule,
    InputSwitchModule,
    MessageModule,
    InputMaskModule,
    CheckboxModule,
    GMapModule,
    ReactiveFormsModule,
    CardModule,
    MenuModule,
    FormsModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    SharedModule,
    SidebarModule,
    TabViewModule,
    DateRangeComponentModule
  ]
})
export class ProjectMainModule { }
