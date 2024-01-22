import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { PointsMainRoutingModule } from './points-main-routing.module';
import { PointsMainComponent } from '../points-main/points-main.component';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';
import { ListboxModule } from 'primeng/listbox';
import { PointsListingComponent } from '../points-listing/points-listing.component';
import { PointsCreateComponent } from '../points-create/points-create.component';
import { PointsDetailsComponent } from '../points-details/points-details.component';
import { PointsEditComponent } from '../points-edit/points-edit.component';


@NgModule({
  declarations: [
    PointsMainComponent,
    PointsListingComponent,
    PointsCreateComponent,
    PointsDetailsComponent,
    PointsEditComponent
  ],
  imports: [
    CommonModule,
    PointsMainRoutingModule,
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
export class PointsMainModule { }
