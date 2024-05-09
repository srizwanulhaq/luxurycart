import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LCTourPackagesMainRoutingModule } from './lc-tour-packages-main-routing.module';
import { LCTourPackagesDetailsComponent } from '../lc-tour-packages-details/lc-tour-packages-details.component';
import { LCTourPackagesMainComponent } from './lc-tour-packages-main.component';
import { LCTourPackagesListingComponent } from '../lc-tour-packages-listing/lc-tour-packages-listing.component';
import { AddLCTourPackageComponent } from '../add-lc-tour-package/add-lc-tour-package.component';
import { UpdateLCTourPackageComponent } from '../update-lc-tour-package/update-lc-tour-package.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LCTourPackageService } from 'src/app/demo/service/lc-tour-package.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { InputSwitchModule } from 'primeng/inputswitch';


@NgModule({
  declarations: [
    LCTourPackagesDetailsComponent,
    LCTourPackagesMainComponent,
    LCTourPackagesListingComponent,
    AddLCTourPackageComponent,
    UpdateLCTourPackageComponent
  ],
  imports: [
    CommonModule,
    LCTourPackagesMainRoutingModule,
    TableModule,
        ButtonModule,
        DropdownModule,
        MessageModule,
        ToastModule,
        ConfirmDialogModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        DialogModule,
        RippleModule,
        ProgressSpinnerModule,
        SidebarModule,
        InputSwitchModule,
        
  ],
  providers: [
    LCTourPackageService, MessageService,ConfirmationService
]
})
export class LCTourPackagesMainModule { }
