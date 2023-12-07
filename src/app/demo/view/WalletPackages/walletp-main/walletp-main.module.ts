import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialogModule } from "primeng/confirmdialog";
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
import { WalletPackageMainComponent } from './walletp-main.component';
import { WalletPackageListingComponent } from '../walletp-listing/walletp-listing.component';
import { WalletPackageMainRoutingModule } from './walletp-main-routing.module';
import { WalletPackageService } from 'src/app/demo/service/walletPackageService';
import { WalletPackageDetailComponent } from '../walletp-details/walletp-details.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { WalletPackageAddComponent } from '../walletp-add/walletp-add.component';
import { WalletPackageEditComponent } from '../walletp-edit/walletp-edit.component';
import { InputTextModule } from 'primeng/inputtext';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';

@NgModule({
    declarations: [
        WalletPackageMainComponent,
        WalletPackageListingComponent,
        WalletPackageDetailComponent,
        WalletPackageAddComponent,
        WalletPackageEditComponent
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
        ConfirmDialogModule,
        ToastModule,
        FormsModule,
        ReactiveFormsModule,
        RippleModule,
        ProgressSpinnerModule,
        SidebarModule,
        WalletPackageMainRoutingModule,
        SidebarModule,
        InputTextModule,
        DateRangeComponentModule
    ],
    providers: [
        WalletPackageService,
        IconService,
        MessageService
    ]
})
export class WalletPackageMainModule { }
