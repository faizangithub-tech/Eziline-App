import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Userroles } from 'src/app/models/user_roles/userroles';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MangeusersService
{
  apipath="http://localhost:5000/api/Admin/usersalongrole"
  editpath="http://localhost:5000/api/Admin/editroles"

  constructor(private _http:HttpClient) { }

  getuseralongroles()
  {
          return this._http.get<Userroles[]>(this.apipath)
  }

  edituserroles(user:Userroles)
  {
          return this._http.post<Userroles>(this.editpath,user)
  }

}
