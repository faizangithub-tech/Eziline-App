import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Website } from 'src/app/models/website/website';

@Injectable({
  providedIn: 'root'
})
export class ManagewebsiteService
{

  apipath="http://localhost:5000/api/ManageSites/addwebsite"

  getapi="http://localhost:5000/api/ManageSites/getwebsite"

  editapi="http://localhost:5000/api/ManageSites/editwebsite"

  delapi="http://localhost:5000/api/ManageSites/"

  webobjid:number
  constructor(private _http:HttpClient) { }


  addwebsite(entity:Website)
  {
            console.log("Entity to be send",entity)

            return this._http.post<Website>(this.apipath,entity)
  }

  getwebsites()
  {
            return this._http.get<Website[]>(this.getapi)
  }

  updatewebsite(object:Website)
  {
            return this._http.put<Website>(this.editapi,object)
  }

  deletewebsite(object:Website)
  {
            return this._http.delete(this.delapi+object.id)
  }
}
