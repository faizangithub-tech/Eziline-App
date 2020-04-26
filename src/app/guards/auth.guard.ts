import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/auth-services/login.service';
import { AlertService } from '../services/alertify/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
  constructor(private _login:LoginService,private _Alert:AlertService,private _route:Router){}
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot):boolean
  {
    if(this._login.isloggedin()==true){
      return true;}
    else{
      this._route.navigate(['login'])
      this._Alert.error("you are not logged in!!")}
  }
}
