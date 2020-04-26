import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from 'src/app/models/users/login';
import { LoginService } from 'src/app/services/auth-services/login.service';
import { HubService } from 'src/app/services/hub-service/hub.service';
import { Router } from '@angular/router';
import { Userroles } from 'src/app/models/user_roles/userroles';
import { Model } from 'src/app/models/paginate/model';
import { zoomOutUpOnLeaveAnimation, zoomInUpOnEnterAnimation } from 'angular-animations';
import { AlertService } from 'src/app/services/alertify/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations:[zoomInUpOnEnterAnimation(),
              zoomOutUpOnLeaveAnimation()]
})
export class LoginComponent implements OnInit
{

  constructor(private _login:LoginService,
    private _hub:HubService,
    private _route:Router,
    private _alert:AlertService) { }
  ngOnInit(){}
  test=[1]
  state=true
  checked=true
  user:Userroles
  checklist=new Model()
  form=new FormGroup
  ({
     email   :new FormControl('',[Validators.required,Validators.email]),
     password:new FormControl('',[Validators.required])
  });

  getErrorMessage()
  {
    return this.form.get("email").hasError('required') ? 'You must enter a value' :
           this.form.get("email").hasError('email') ? 'Not a valid email' : '';
  }
  getPasswordError()
  {
    return this.form.get("password").hasError('required') ? 'You must enter your password':'';
  }

  login()
  {
    let user=new Login();
        user=this.form.value;
    this._login.login(user).subscribe((data)=>{
            this._hub.buildconnection();
    },error=>{
        this._alert.error(error)})
  }



addclass()
{
  let classes=
  {
   disabled:this.form.invalid
  }
  return classes
}
signup()
{
  this.state=false
  setTimeout(() =>{
    this._route.navigate(['/signup'])
  }, 1000);}}
