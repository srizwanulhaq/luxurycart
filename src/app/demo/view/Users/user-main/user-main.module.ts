import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserMainRoutingModule } from './user-main-routing.module';
import { UserListingComponent } from '../user-listing/user-listing.component';
import { UserService } from 'src/app/demo/service/user.service';

import { MessageService } from 'primeng/api';

import { TableModule } from 'primeng/table';
import { UserMainComponent } from './user-main.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { SidebarModule } from 'primeng/sidebar';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserAddComponent } from '../user-add/user-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ListboxModule } from 'primeng/listbox';
import { PasswordModule } from 'primeng/password';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';




@NgModule({
    declarations: [UserMainComponent, UserAddComponent, UserEditComponent, UserListingComponent, UserDetailsComponent],
    imports: [
        UserMainRoutingModule,
        CommonModule,
        TableModule,
        TabViewModule,
        SidebarModule,
        TabMenuModule,
        PanelModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        DialogModule,
        ToastModule,
        RippleModule,
        InputTextModule,
        DropdownModule,
        RadioButtonModule,
        ListboxModule,
        PasswordModule,
        DateRangeComponentModule
    ],
    providers: [
        UserService, MessageService
    ]
})
export class UserMainModule { }
