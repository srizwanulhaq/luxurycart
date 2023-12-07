import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


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
import { AgmCoreModule } from '@agm/core';
import { VehicleMainRoutingModule } from './vehicle-main-routing.module';
import { VehicleMainComponent } from './vehicle-main.component';
import { VehicleListingComponent } from '../vehicle-listing/vehicle-listing.component';
import { VehicleDetailsComponent } from '../vehicle-details/vehicle-details.component';
import { VehicleCreateComponent } from '../vehicle-create/vehicle-create.component';
import { VehicleService } from 'src/app/demo/service/vehicleservice';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { VehicleEditComponent } from '../vehicle-edit/vehicle-edit.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { VehicleChangeLocationComponent } from '../vehicle-change-location/vehicle-change-location.component';
import { environment } from 'src/environments/environment';
import { VehicleTrackComponent } from '../vehicle-track/vehicle-track.component';
import { DateAgoPipe } from 'src/app/demo/domain/Pipe/date-ago.pipe';
import { QRCodeModule } from 'angular2-qrcode';
import { VehicleActionSendComponent } from '../vehicle-action-send/vehicle-action-send.component';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';
import { VehicleCurrentStatusComponent } from '../vehicle-current-status/vehicle-current-status.component';

@NgModule({
    declarations: [
        VehicleMainComponent,
        VehicleListingComponent,
        VehicleDetailsComponent,
        VehicleCreateComponent,
        VehicleEditComponent,
        VehicleChangeLocationComponent,
        VehicleTrackComponent,
        VehicleActionSendComponent,
        DateAgoPipe,
        VehicleCurrentStatusComponent

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
        PanelModule,
        InputTextModule,
        VehicleMainRoutingModule,
        InputSwitchModule,
        AgmCoreModule.forRoot({
            apiKey: environment.gooogleApiKey,
            libraries: ['places', 'drawing', 'geometry']
        }),
        QRCodeModule,
        DateRangeComponentModule
    ],
    providers: [
        VehicleService,
        MessageService
    ]
})
export class VehicleMainModule { }
