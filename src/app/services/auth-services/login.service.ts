import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Login } from 'src/app/models/users/login';
import { Loggedinuser } from 'src/app/models/users/loggedinuser'
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService
{

  _loggedinuser:Loggedinuser
  _loggedin:boolean
  _decodedtoken:any
  _jwtHelper=new JwtHelperService();
  _authlogin="http://localhost:5000/api/Auth/login"

  dummy="../../../../assets/images/dumyuser.png"
  constructor(private _http:HttpClient) { }

  login(user:Login)
  {
      return this._http.post<Loggedinuser>(this._authlogin,user)
                       .pipe(map((response:any)=>
                       {
                             this._loggedinuser=response.user;
                             localStorage.setItem("token",response.token);
                             let jsobj=JSON.stringify(response.user)
                             sessionStorage.setItem("currentuser",jsobj)
                             this._loggedin=true
                             console.log("loggedin user",this._loggedinuser)
                       }))
  }

  signup()
  {
      return this._http.get("http://localhost:5000/api/Admin/usersalongrole")
  }

  rolematch(allowedroles)
  {
      const dataroles=allowedroles.roles as Array<string>
      let match =false
      this._decodedtoken=this._jwtHelper.decodeToken(localStorage.getItem("token"))
      const roles =this._decodedtoken.role as Array<string>
      if(roles!=null)
      { dataroles.forEach((value)=>
        {
             if(roles.includes(value))
             {
                match=true
                return
             }
        })}
      else
      { match=true
        return}
      return match
  }

  getdecodedtoken()
  {
    this._decodedtoken=this._jwtHelper.decodeToken(localStorage.getItem("token"))
    const roles=this._decodedtoken.role as Array<string>
    return roles;
  }

  isloggedin()
  {
      let tokenexsist=this._jwtHelper.decodeToken(localStorage.getItem("token"))
        if(tokenexsist)
            return true
        else
            return false
  }

}
