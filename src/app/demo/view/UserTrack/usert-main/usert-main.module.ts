import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserTrackMainRoutingModule } from './usert-main-routing.module';
import { TableModule } from 'primeng/table';
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
import { UserTrackMainComponent } from './usert-main.component';
import { UserTrackListingComponent } from '../usert-listing/usert-listing.component';
import { UserService } from 'src/app/demo/service/user.service';
import { UserTrackDetailComponent } from '../usert-detail/usert-detail.component';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';
import { UserTrackMapComponent } from '../usert-map/usert-map.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

@NgModule({
    declarations: [
        UserTrackMainComponent,
        UserTrackListingComponent,
        UserTrackDetailComponent,
        UserTrackMapComponent
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
        UserTrackMainRoutingModule,
        DateRangeComponentModule,
        AgmCoreModule.forRoot({
            apiKey: environment.gooogleApiKey,
        }),
    ],
    providers: [
        UserService,
        IconService,
        MessageService,
    ]
})
export class UserTrackMainModule { }
