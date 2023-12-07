import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentRequestMainRoutingModule } from './rent-request-main-routing.module';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { RentRequestMainComponent } from './rent-request-main.component';
import { RentRequestListComponent } from '../rent-request-list/rent-request-list.component';
import { RentRequestDetailsComponent } from '../rent-request-details/rent-request-details.component';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';

@NgModule({
    declarations: [RentRequestMainComponent, RentRequestListComponent, RentRequestDetailsComponent],
    imports: [
        CommonModule,
        RentRequestMainRoutingModule,
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
        DateRangeComponentModule
    ]
})
export class RentRequestMainModule { }
