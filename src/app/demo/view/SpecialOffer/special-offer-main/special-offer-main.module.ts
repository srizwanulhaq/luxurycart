import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialOfferMainRoutingModule } from './special-offer-main-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { DialogModule } from "primeng/dialog";
import { MessageModule } from "primeng/message";
import { MessagesModule } from "primeng/messages";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import {MultiSelectModule} from 'primeng/multiselect';
import { ToastModule } from "primeng/toast";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { AutoCompleteModule } from "primeng/autocomplete";
import {InputSwitchModule} from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { RippleModule } from 'primeng/ripple';
import { SpecialOfferListComponent } from '../special-offer-list/special-offer-list.component';
import { SpecialOfferEditComponent } from '../special-offer-edit/special-offer-edit.component';
import { SpecialOfferDetailsComponent } from '../special-offer-details/special-offer-details.component';
import { SpecialOfferCreateComponent } from '../special-offer-create/special-offer-create.component';
import { SpecialOfferMainComponent } from './special-offer-main.component';
import { SidebarModule } from 'primeng/sidebar';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';
@NgModule({
  declarations: [
    SpecialOfferListComponent,
    SpecialOfferEditComponent,
    SpecialOfferDetailsComponent,
    SpecialOfferCreateComponent,
    SpecialOfferMainComponent
  
  ],
  imports: [
    CommonModule,
    SpecialOfferMainRoutingModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    MessageModule,
    MessagesModule,
    DateRangeComponentModule,
    ToastModule,
    ConfirmDialogModule,
    MultiSelectModule,
    AutoCompleteModule,
    InputSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ToolbarModule,
    PanelModule,
    TabViewModule,
    InputTextModule,
    DialogModule,
    RippleModule,
    ProgressSpinnerModule,
    SidebarModule
  ]
})
export class SpecialOfferMainModule { }
