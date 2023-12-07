import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Logindao, LoginResponsedao } from 'src/app/demo/domain/Dao/Login/Logindao';
import { Logindto } from 'src/app/demo/domain/Dto/Login/Logindto';
import { AuthenticationService } from 'src/app/demo/service/authenticationservice';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  private returnUrl: string;
  
  loginForm: FormGroup;
  errorMessage: string = '';
  showError: boolean;
  btnloading:boolean = false;

  constructor(private authService: AuthenticationService, private _formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
    this._formBuilder.group(this.loadForm);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  validateControl = (controlName: string) => {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched
  }

  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.get(controlName).hasError(errorName)
  }

  loginUser = (loginFormValue) => {
    this.showError = false;
    this.btnloading = true;
    const login = {... loginFormValue };
    const userForAuth: Logindto = {
      username: login.username,
      password: login.password
    }
    this.authService.loginUser(userForAuth)
    .subscribe({
      next: (res:LoginResponsedao) => {
       this.btnloading = false;
       localStorage.setItem("token", res.data.token);
       localStorage.setItem("refreshToken", res.data.refreshToken);
       localStorage.setItem("userName", res.data.userName);
       localStorage.setItem("currentUser", JSON.stringify(res.data));
       localStorage.setItem("roleName", res.data.roleName);
       localStorage.setItem("zoneCount", res.data.zoneCount);

       this.authService.sendAuthStateChangeNotification(res.status);
       this.router.navigate([this.returnUrl]);
    },
    error: (err: HttpErrorResponse) => {
      
      this.btnloading = false;
      this.errorMessage = err.error.message;
      this.showError = true;
    }})
  }
 
}
