import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitPlaceMainRoutingModule } from './visit-place-main-routing.module';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { GMapModule } from 'primeng/gmap';
import { CardModule, } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AgmCoreModule } from '@agm/core';
import { SharedModule } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { VisitPlaceMainComponent } from './visit-place-main.component';
import { VisitPlaceCreateComponent } from '../visit-place-create/visit-place-create.component';
import { VisitPlaceListComponent } from '../visit-place-list/visit-place-list.component';
import { VisitPlaceDetailsComponent } from '../visit-place-details/visit-place-details.component';
import { VisitPlaceEditComponent } from '../visit-place-edit/visit-place-edit.component';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';

@NgModule({
  declarations: [VisitPlaceMainComponent,VisitPlaceCreateComponent,VisitPlaceListComponent,VisitPlaceDetailsComponent,VisitPlaceEditComponent],
  imports: [
    CommonModule,
    VisitPlaceMainRoutingModule,
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
        MessageModule,
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
        FileUploadModule,
        RatingModule
  ]
})
export class VisitPlaceMainModule { }
