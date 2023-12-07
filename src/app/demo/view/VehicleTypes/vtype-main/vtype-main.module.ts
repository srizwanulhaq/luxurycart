import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleTypeMainRoutingModule } from './vtype-main-routing.module';
import { VehicleTypeListingComponent } from '../vtype-listing/vtype-listing.component';
import { VehicleTypeFormComponent } from '../vtype-form/vtype-form.component';


import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { ListboxModule } from 'primeng/listbox';
import { SplitterModule } from 'primeng/splitter';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PermissionService } from 'src/app/demo/service/permission.service';
import { VehicleTypeMainComponent } from './vtype-main.component';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';
import { VehicleService } from 'src/app/demo/service/vehicleservice';


@NgModule({
    declarations: [VehicleTypeMainComponent, VehicleTypeListingComponent, VehicleTypeFormComponent],
    imports: [
        CommonModule,
        VehicleTypeMainRoutingModule,
        TableModule,
        TabViewModule,
        SidebarModule,
        TabMenuModule,
        PanelModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        DialogModule,
        ToastModule,
        RippleModule,
        InputTextModule,
        DropdownModule,
        CheckboxModule,
        ListboxModule,
        SplitterModule,
        InputSwitchModule,
        DateRangeComponentModule
    ],
    providers: [
        VehicleService,
        MessageService, PermissionService
    ]
})
export class VehicleTypeMainModule { }
