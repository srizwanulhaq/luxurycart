import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapMainRoutingModule } from './map-main-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { MessageModule } from 'primeng/message';
import { TabMenuModule } from 'primeng/tabmenu';
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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { SharedModule } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { MapComponent } from '../map/map.component';
import { MapMainComponent } from './map-main.component';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';


@NgModule({
  declarations: [MapComponent,MapMainComponent],
  imports: [
    CommonModule,
    MapMainRoutingModule,
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
    TabMenuModule,
    TabViewModule,
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
    AgmCoreModule.forRoot({
      apiKey: environment.gooogleApiKey,
      libraries: ['places', 'drawing', 'geometry']
    }),
    DateRangeComponentModule
  ]
})
export class MapMainModule { }
