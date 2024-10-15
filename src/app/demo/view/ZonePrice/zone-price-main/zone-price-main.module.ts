

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { MessageModule } from 'primeng/message';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';
import { ZonePriceMainRoutingModule } from './zone-price-main-routing.module';
import { ZonePriceMainComponent } from './zone-price-main.component';
import { ZonePriceAddComponent } from '../zone-price-add/zone-price-add.component';
import { ZonePriceListComponent } from '../zone-price-list/zone-price-list.component';

@NgModule({
    declarations: [
      ZonePriceMainComponent,
      ZonePriceAddComponent,
      ZonePriceListComponent
    ],
    imports: [
        CommonModule,
        ZonePriceMainRoutingModule,
        TableModule,
        DialogModule,
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
        FormsModule,
        SharedModule,
        ToolbarModule,
        RippleModule,
        ProgressSpinnerModule,
        SidebarModule,
        CalendarModule,
        DateRangeComponentModule
    ]
})
export class ZonePriceMainModule { }


