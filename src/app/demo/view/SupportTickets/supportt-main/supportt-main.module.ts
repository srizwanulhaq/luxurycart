import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from "primeng/toast";
import { IconService } from 'src/app/demo/service/iconservice';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { SupportTicketMainComponent } from './supportt-main.component';
import { SupportTicketListingComponent } from '../supportt-listing/supportt-listing.component';
import { SupportTicketMainRoutingModule } from './supportt-main-routing.module';
import { SupportTicketService } from 'src/app/demo/service/supportTicketService';
import { SupportTicketDetailComponent } from '../supportt-details/supportt-details.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { VehicleMaintenanceAddComponent } from '../supportm-add/supportm-add.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    declarations: [
        SupportTicketMainComponent,
        SupportTicketListingComponent,
        SupportTicketDetailComponent,
        VehicleMaintenanceAddComponent
    ],
    imports: [
        InputSwitchModule,
        CommonModule,
        TableModule,
        TabViewModule,
        PanelModule,
        ButtonModule,
        ToolbarModule,
        DialogModule,
        AutoCompleteModule,
        ToastModule,
        FormsModule,
        ReactiveFormsModule,
        RippleModule,
        ProgressSpinnerModule,
        SidebarModule,
        SupportTicketMainRoutingModule,
        SidebarModule,
        MultiSelectModule,
        DropdownModule,
        InputTextModule
    ],
    providers: [
        SupportTicketService,
        IconService,
        MessageService
    ]
})
export class SupportTicketMainModule { }
