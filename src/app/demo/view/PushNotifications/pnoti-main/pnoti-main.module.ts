import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PushNotificationMainRoutingModule } from './pnoti-main-routing.module';
import { TableModule } from 'primeng/table';
import { PushNotificationMainComponent } from './pnoti-main.component';
import { PushNotificationCreateComponent } from '../pnoti-create/pnoti-create.component';
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
import { PushNotificationService } from 'src/app/demo/service/push-notification.service';
import { EditorModule } from 'primeng/editor';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
    declarations: [
        PushNotificationMainComponent,
        PushNotificationCreateComponent
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
        PushNotificationMainRoutingModule,
        EditorModule,
        MultiSelectModule,
        RadioButtonModule,
        InputTextModule,
        TooltipModule
    ],
    providers: [
        PushNotificationService,
        IconService,
        MessageService,
    ]
})
export class PushNotificationMainModule { }
