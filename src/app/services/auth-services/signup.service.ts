import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Newuser } from 'src/app/models/users/newuser';

@Injectable({
  providedIn: 'root'
})
export class SignUpService{

  apipath="http://localhost:5000/api/Auth/uniquename?="
  uniqemail="http://localhost:5000/api/Auth/uniqueemail?="
  reguser="http://localhost:5000/api/Auth/register/"
  constructor(private _http:HttpClient){}


  uniqueusername(username:string){

      return  this._http.get(this.apipath+username)
  }
  uniqueemail(email:string){
      return  this._http.get(this.uniqemail+email)
  }

  register(user:Newuser){
      return  this._http.post(this.reguser,user)
  }

}
