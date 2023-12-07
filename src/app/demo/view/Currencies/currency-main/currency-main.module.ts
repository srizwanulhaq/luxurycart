import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyMainRoutingModule } from './currency-main-routing.module';
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
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { CurrencyListComponent } from '../currency-list/currency-list.component';
import { CurrencyMainComponent } from './currency-main.component';
import { CurrencyCreateComponent } from '../currency-create/currency-create.component';
import { CurrencyEditComponent } from '../currency-edit/currency-edit.component';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';


@NgModule({
    declarations: [CurrencyListComponent, CurrencyMainComponent, CurrencyCreateComponent, CurrencyEditComponent],
    imports: [
        CommonModule,
        CurrencyMainRoutingModule,
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
        DateRangeComponentModule
    ]
})
export class CurrencyMainModule { }
