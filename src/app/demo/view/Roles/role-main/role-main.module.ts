import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleMainRoutingModule } from './role-main-routing.module';
import { RoleMainComponent } from './role-main.component';
import { RoleListingComponent } from '../role-listing/role-listing.component';
import { RoleAddComponent } from '../role-add/role-add.component';
import { RoleEditComponent } from '../role-edit/role-edit.component';
import { RoleDetailsComponent } from '../role-details/role-details.component';


import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RoleService } from 'src/app/demo/service/role.service';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { ListboxModule } from 'primeng/listbox';
import { SplitterModule } from 'primeng/splitter';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PermissionService } from 'src/app/demo/service/permission.service';


@NgModule({
  declarations: [RoleMainComponent, RoleDetailsComponent, RoleListingComponent, RoleAddComponent, RoleEditComponent],
  imports: [
    CommonModule,
    RoleMainRoutingModule,
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
    CheckboxModule,
    ListboxModule,
    SplitterModule,
    InputSwitchModule
  ],
  providers: [
    RoleService, MessageService, PermissionService
  ]
})
export class RoleMainModule { }
