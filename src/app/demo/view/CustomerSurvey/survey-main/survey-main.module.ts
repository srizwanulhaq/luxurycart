import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyMainRoutingModule } from './survey-main-routing.module';
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
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';
import { SurveyCreateComponent } from '../survey-create/survey-create.component';
import { SurveyListComponent } from '../survey-list/survey-list.component';
import { SurveyMainComponent } from './survey-main.component';
import { SliderModule } from 'primeng/slider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { HttpClientModule } from '@angular/common/http';
import { SurveyDetailsComponent } from '../survey-details/survey-details.component';


@NgModule({
    declarations: [
        SurveyCreateComponent,
        SurveyListComponent,
        SurveyDetailsComponent,
        SurveyMainComponent
    ],
    imports: [
        CommonModule,
        SurveyMainRoutingModule,
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
        SliderModule,
        RadioButtonModule,
        HttpClientModule,
    ]
})
export class SurveyMainModule { }
