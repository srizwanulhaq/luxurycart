import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoothMainRoutingModule } from './booth-main-routing.module';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { GMapModule } from 'primeng/gmap';
import { CardModule, } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SharedModule } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';
import { BoothListComponent } from '../booth-list/booth-list.component';
import { BoothMainComponent } from './booth-main.component';
import { BoothCreateComponent } from '../booth-create/booth-create.component';
import { BoothDetailsComponent } from '../booth-details/booth-details.component';
import { BoothEditComponent } from '../booth-edit/booth-edit.component';


@NgModule({
  declarations: [BoothListComponent,BoothMainComponent,BoothCreateComponent,BoothDetailsComponent,BoothEditComponent],
  imports: [
    CommonModule,
    BoothMainRoutingModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    MessagesModule,
    InputSwitchModule,
    MessageModule,
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
export class BoothMainModule { }
