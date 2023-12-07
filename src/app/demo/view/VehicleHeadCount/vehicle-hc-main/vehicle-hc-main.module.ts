import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleHeadCountMainRoutingModule } from './vehicle-hc-main-routing.module';
import { TableModule } from 'primeng/table';
import { VehicleHeadCountMainComponent } from './vehicle-hc-main.component';
import { VehicleHeadCountListingComponent } from '../vehicle-hc-listing/vehicle-hc-listing.component';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { IconService } from 'src/app/demo/service/iconservice';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { VehicleService } from 'src/app/demo/service/vehicleservice';
import { VehicleHeadCountCreateComponent } from '../vehicle-hc-create/vehicle-hc-create.component';

@NgModule({
    declarations: [
        VehicleHeadCountMainComponent,
        VehicleHeadCountListingComponent,
        VehicleHeadCountCreateComponent
    ],
    imports: [
        CommonModule,
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
        DialogModule,
        VehicleHeadCountMainRoutingModule,
    ],
    providers: [
        VehicleService,
        IconService,
        MessageService,
    ]
})
export class VehicleHeadCountMainModule { }
