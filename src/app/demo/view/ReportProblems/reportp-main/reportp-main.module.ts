import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
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
import { ReportProblemMainComponent } from './reportp-main.component';
import { ReportProblemListingComponent } from '../reportp-listing/reportp-listing.component';
import { ReportProblemMainRoutingModule } from './reportp-main-routing.module';
import { ReportProblemService } from 'src/app/demo/service/reportProblemService';
import { ReportProblemDetailComponent } from '../reportp-details/reportp-details.component';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';

@NgModule({
    declarations: [
        ReportProblemMainComponent,
        ReportProblemListingComponent,
        ReportProblemDetailComponent
    ],
    imports: [
        CommonModule,
        TableModule,
        TabViewModule,
        PanelModule,
        ButtonModule,
        ToolbarModule,
        DialogModule,
        AutoCompleteModule,
        FormsModule,
        ReactiveFormsModule,
        RippleModule,
        ProgressSpinnerModule,
        SidebarModule,
        ReportProblemMainRoutingModule,
        DateRangeComponentModule
    ],
    providers: [
        ReportProblemService,
        IconService,
        MessageService
    ]
})
export class ReportProblemMainModule { }
