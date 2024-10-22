import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZonePriceMainRoutingModule } from './zone-price-main-routing.module';

import { StepsModule } from 'primeng/steps';

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
import { AgmCoreModule } from '@agm/core';
import { SharedModule } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ZonePriceListComponent } from '../zone-price-list/zone-price-list.component';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';
import { ZonePriceMainComponent } from './zone-price-main.component';
import { ZonePriceAddComponent } from '../zone-price-add/zone-price-add.component';
import { ZonePriceEditComponent } from '../zone-price-edit/zone-price-edit.component';


@NgModule({
    declarations: [ZonePriceMainComponent, ZonePriceAddComponent, ZonePriceListComponent,ZonePriceEditComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ZonePriceMainRoutingModule,
        StepsModule,
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
        CardModule,
        MenuModule,
        FormsModule,
        ConfirmDialogModule,
        ProgressSpinnerModule,
        SharedModule,
        SidebarModule,
        TabViewModule,
        AgmCoreModule.forRoot({
            apiKey: environment.gooogleApiKey,
            libraries: ['places', 'drawing', 'geometry']
        }),
        DateRangeComponentModule
    ]
})
export class ZonePriceMainModule { }
