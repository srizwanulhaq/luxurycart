import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RideMainRoutingModule } from './ride-main-routing.module';
import { TableModule } from 'primeng/table';
import { RideMainComponent } from './ride-main.component';
import { RideListingComponent } from '../ride-listing/ride-listing.component';
import { RideDetailsComponent } from '../ride-details/ride-details.component';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { RideService } from 'src/app/demo/service/rideservice';
import { IconService } from 'src/app/demo/service/iconservice';
import { ButtonModule } from 'primeng/button';
import { RideCreateComponent } from '../ride-create/ride-create.component';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { VehicleService } from 'src/app/demo/service/vehicleservice';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { RatingModule } from 'primeng/rating';
import { RideTrackComponent } from '../ride-track/ride-track.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { RidePathComponent } from '../ride-path/ride-path.component';
import { DateRangeComponent } from '../../DateRange/date-range.component';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';
@NgModule({
    declarations: [
        RideMainComponent,
        RideListingComponent,
        RideDetailsComponent,
        RideCreateComponent,
        RideTrackComponent,
        RidePathComponent
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
        RideMainRoutingModule,
        PanelModule,
        RatingModule,
        AgmCoreModule.forRoot({
            apiKey: environment.gooogleApiKey,
            libraries: ['places', 'drawing', 'geometry']
        }),
        DateRangeComponentModule
    ],
    providers: [
        RideService,
        IconService,
        VehicleService,
        MessageService,

        // { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
    ]
})
export class RideMainModule { }
