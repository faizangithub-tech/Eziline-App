import { Injectable } from '@angular/core';
import { ActivatedRoute, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ManagewebsiteService } from '../components/admin-area/services/managewebsite.service';
import { Observable } from 'rxjs';
import { WesitedetailService } from '../services/websitedetail/wesitedetail.service';

@Injectable({
  providedIn: 'root'
})
export class WebsitedetailResolverService implements Resolve<any>
{


  constructor(private _details:WesitedetailService){}

  resolve(route:ActivatedRouteSnapshot)
  {
      const id = +route.params['id']

      return this._details.getwebsite(id)
  }

}
