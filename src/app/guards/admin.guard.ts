import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/auth-services/login.service';
import { AlertService } from '../services/alertify/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate
{
  constructor(private _login:LoginService,private _alert:AlertService,private _route:Router){ }
  canActivate(next:ActivatedRouteSnapshot): boolean
  {
    const data=next.routeConfig.data

    const match=this._login.rolematch(data)

    if(match)
    {
      return true
    }
    else
    {
      this._alert.error("You are not Authoraized")
    }
  }
}
