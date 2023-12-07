import { Logindao } from '../domain/Dao/Login/Logindao';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from './authenticationservice';
import { RefreshTokendao } from '../domain/Dao/Login/RefreshTokendao';
import { RefreshTokendto } from '../domain/Dto/Login/RefreshTokendto';
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate  {
  constructor(private authService: AuthenticationService, private router:Router, private http: HttpClient){}
  
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   
    if (this.authService.isUserAuthenticated()) {
      return true;
    }
    
    const token = localStorage.getItem("token");
    
    const isRefreshSuccess = await this.tryRefreshingTokens(token); 
    if (!isRefreshSuccess) { 
      this.router.navigate(["login/login-main"]); 
    }
    return isRefreshSuccess;
  }

  private async tryRefreshingTokens(token: string): Promise<boolean> {
    const refreshToken: string = localStorage.getItem("refreshToken");
    
    if (!token || !refreshToken) { 
      return false;
    }
    
    const credentials : RefreshTokendto = { accessToken : token, refreshToken: refreshToken };

    let isRefreshSuccess: boolean;
    const refreshRes = await new Promise<RefreshTokendao>(async (resolve, reject) => { 
            await (await this.authService.refreshToken(credentials)).subscribe({
              next: (res: RefreshTokendao) => resolve(res),
              error: (_) => { reject; isRefreshSuccess = false; this.router.navigate(["login/login-main"]); }
            });
      });
   
    localStorage.setItem("token", refreshRes.accessToken);
    localStorage.setItem("refreshToken", refreshRes.refreshToken);
    isRefreshSuccess = true;
    return isRefreshSuccess;
  }
}