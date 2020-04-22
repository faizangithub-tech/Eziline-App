import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Websitedetail } from 'src/app/models/website/websitedetail';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reviewentity } from 'src/app/models/website/reviewentity';
import { Website } from 'src/app/models/website/website';

@Injectable({
  providedIn: 'root'
})
export class WesitedetailService
{

  website:Websitedetail
  customwebobj=new Website()
  apipath="http://localhost:5000/api/ManageSites/"

  getreviewsapi="http://localhost:5000/api/MangeReviews/getreviews?webid="

  getratingsapi="http://localhost:5000/api/MangeReviews/"

  addreviewapi="http://localhost:5000/api/MangeReviews/addreview/"

  constructor(private _http:HttpClient) { }

  getwebsite(id:number)
  {
      console.log("Website Detailed Servive Method Called"+"Got Id from parameter",id)
      return  this._http.get<Websitedetail>(this.apipath+id);
  }

  getallreviews(id:number)
  {
      return  this._http.get(this.getreviewsapi+id);
  }
  getratings(id:number)
  {
      return  this._http.get(this.getratingsapi+id)

  }
  submitreview(obj:Reviewentity)
  {
      return  this._http.post(this.addreviewapi,obj)
  }

}
