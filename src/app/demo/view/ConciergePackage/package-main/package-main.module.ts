import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageMainRoutingModule } from './package-main-routing.module';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessageModule } from 'primeng/message';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { GMapModule } from 'primeng/gmap';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SharedModule } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { PackageCreateComponent } from '../package-create/package-create.component';
import { PackageDetailsComponent } from '../package-details/package-details.component';
import { PackageEditComponent } from '../package-edit/package-edit.component';
import { PackageListingComponent } from '../package-listing/package-listing.component';
import { PackageMainComponent } from './package-main.component';


@NgModule({
  declarations: [
    PackageCreateComponent,
    PackageDetailsComponent,
    PackageEditComponent,
    PackageListingComponent,
    PackageMainComponent
  ],
  imports: [
    CommonModule,
    PackageMainRoutingModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    MessagesModule,
    InputSwitchModule,
    MessageModule,
    MessagesModule,
    InputMaskModule,
    CheckboxModule,
    GMapModule,
    ReactiveFormsModule,
    CardModule,
    MenuModule,
    FormsModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    SharedModule,
    SidebarModule,
    TabViewModule,
    DateRangeComponentModule
  ]
})
export class PackageMainModule { }
