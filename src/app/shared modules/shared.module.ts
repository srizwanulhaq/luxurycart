import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasPermissionDirective } from '../directives/has-permission.directive';



@NgModule({
  exports: [HasPermissionDirective],
  declarations: [HasPermissionDirective],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
