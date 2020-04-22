import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Website } from '../models/website/website';
import { ManagewebsiteService } from '../components/admin-area/services/managewebsite.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagewebsiteResolverService implements Resolve<Website[]>
{

  constructor(private _managewebsite:ManagewebsiteService) { }

  resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<Website[]>
  {
             return this._managewebsite.getwebsites()
  }


}
