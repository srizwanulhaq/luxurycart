import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageIotMainRoutingModule } from './manage-iot-main-routing.module';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { RouterModule } from '@angular/router';
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
import { ManageIotListComponent } from '../manage-iot-list/manage-iot-list.component';
import { ManageIotEditComponent } from '../manage-iot-edit/manage-iot-edit.component';
import { ManageIotDetailsComponent } from '../manage-iot-details/manage-iot-details.component';
import { ManageIotCreateComponent } from '../manage-iot-create/manage-iot-create.component';
import { IconService } from 'src/app/demo/service/iconservice';
import { ManageIotService } from 'src/app/demo/service/manage-iot.service';
import { ManageIotMainComponent } from './manage-iot-main.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';
import { PasswordModule } from 'primeng/password';



@NgModule({
    declarations: [
        ManageIotMainComponent,
        ManageIotListComponent,
        ManageIotEditComponent,
        ManageIotDetailsComponent,
        ManageIotCreateComponent,
    ],
    imports: [
        CommonModule,
        ManageIotMainRoutingModule,
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
        CheckboxModule,
        InputTextModule,
        DateRangeComponentModule,
        PasswordModule
    ],
    providers: [
        ManageIotService,
        IconService,
        MessageService
    ]
})
export class ManageIotMainModule { }
