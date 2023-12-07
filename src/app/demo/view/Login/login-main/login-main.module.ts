import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginMainRoutingModule } from './login-main-routing.module';
import { LoginMainComponent } from './login-main.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CheckboxModule } from 'primeng/checkbox';
import {PasswordModule} from 'primeng/password';

@NgModule({
  declarations: [
    LoginMainComponent,
    LoginFormComponent],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule, 
    ReactiveFormsModule,
    ProgressSpinnerModule,
    LoginMainRoutingModule,
    CheckboxModule,
    PasswordModule
   
  ],
})
export class LoginMainModule { }
