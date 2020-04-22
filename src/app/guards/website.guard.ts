import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/auth-services/login.service';
import { AlertService } from '../services/alertify/alert.service';

@Injectable({
  providedIn: 'root'
})
export class WebsiteGuard implements CanActivate
{
  constructor(private _login:LoginService,private _alert:AlertService,private _route:Router)
  {

  }
  canActivate(next: ActivatedRouteSnapshot):boolean
  {
    const data=next.routeConfig.data
    const match=this._login.rolematch(data)
    if(match)
    {
      return true
    }
    else
    {

      this._route.navigateByUrl('/Home/denied');
      return false
    }
  }

}
