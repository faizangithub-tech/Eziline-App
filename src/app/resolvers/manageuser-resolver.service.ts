import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Userroles } from '../models/user_roles/userroles';
import { MangeusersService } from '../components/admin-area/services/mangeusers.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageuserResolverService implements Resolve<Userroles[]>
{
  constructor(private _manageuser:MangeusersService) { }
  resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<Userroles[]>
  {
       return this._manageuser.getuseralongroles()
  }

}
