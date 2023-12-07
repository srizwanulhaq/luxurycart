import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Logindao, LoginResponsedao } from '../domain/Dao/Login/Logindao';
import { Logindto } from '../domain/Dto/Login/Logindto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RefreshTokendto } from '../domain/Dto/Login/RefreshTokendto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();

  private currentUserSubject: BehaviorSubject<Logindao>;
  public currentUser: Observable<Logindao>;
  
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService,private router: Router) { 
    this.currentUserSubject = new BehaviorSubject<Logindao>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Logindao {
    return this.currentUserSubject.value;
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    return token && !this.jwtHelper.isTokenExpired(token);
  }
  
  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.currentUserSubject = new BehaviorSubject<Logindao>(JSON.parse(localStorage.getItem('currentUser')));
    this.authChangeSub.next(isAuthenticated);
  }
  
  public loginUser = (body: Logindto) => {
    return this.http.post<LoginResponsedao>(`${environment.apiUrl}/api/v1/AdminAuthenticate/login`,body);
  }

  async refreshToken(credentials: RefreshTokendto) {
    return  this.http.post<any>(`${environment.apiUrl}/api/v1/AdminAuthenticate/refresh-token`, credentials);
  }

  logout() 
  {
    localStorage.removeItem("zoneCount")
    var userName = localStorage.getItem("userName");
    
    localStorage.removeItem("token");
    this.http.post<any>(`${environment.apiUrl}/api/v1/AdminAuthenticate/revoke/${userName}`,{ headers: new HttpHeaders({"Content-Type": "application/json"})}).subscribe();
    this.currentUserSubject.next(null);
    this.router.navigate(['login/login-main']);
  }
}