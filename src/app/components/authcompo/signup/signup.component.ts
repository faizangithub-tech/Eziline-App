import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { username } from '../customvalidator/username';
import { Password } from '../customvalidator/password';
import { SignUpService } from 'src/app/services/auth-services/signup.service';
import { Newuser } from 'src/app/models/users/newuser';
import { Email } from '../customvalidator/email';
import { AlertService } from 'src/app/services/alertify/alert.service';
import { zoomOutUpOnLeaveAnimation, zoomInUpOnEnterAnimation} from 'angular-animations'
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations:[zoomInUpOnEnterAnimation(),
              zoomOutUpOnLeaveAnimation()]
})
export class SignupComponent implements OnInit {

  state=true
  constructor(private _service:SignUpService,private _alert:AlertService,private _route:Router) { }

  ngOnInit() {}

  form=new FormGroup
  ({
     email   :new FormControl('',[Validators.required,Validators.email],[Email.mustbeunique(this._service)]),
     password:new FormControl('',[Validators.required,Validators.minLength(6),Password.strongpassword]),
     username:new FormControl('',
     [Validators.required,username.spacenotallowed,Validators.maxLength(12)],
     [username.mustbeunique(this._service)])
  });

  getErrorMessage(){
    return this.form.get("email").hasError('required') ? 'You must enter a value' :
           this.form.get("email").hasError('email') ? 'Not a valid email' :
           this.form.get("email").hasError('alreadytaken')?'email has already be taken':'';}

  getusenameerror(){
    return this.form.get("username").hasError('cannotContainSapce') ? 'You username must be free of spaces' :
           this.form.get("username").hasError('maxlength')? 'username must not be greater than 10':
           this.form.get("username").hasError('required')?'username is required':
           this.form.get("username").hasError('alreadytaken')? 'username already taken':''}

  getpassworderror(){
    return  this.form.get("password").hasError('required')?'password is required':
            this.form.get("password").hasError('minlength')?'required length is 6':
            this.form.get("password").hasError('weakpassword')?'must have capital and small Numeric AlphaNumeric and NonAlphaNumeric ':''}


  submit()
  {
    let newuser=new Newuser();
        newuser=this.form.value
        this._service.register(newuser)
                     .subscribe((data)=>{
                        this._alert.success("add user successfully")
                        this.emptyform()
                     },error=>this._alert.error(error))}

  login()
  {
     this.state=false
     setTimeout(() =>{
     this._route.navigate(['login'])},1000)}

  emptyform(){
    this.form.setValue
    ({
        email:" ",
        password:" ",
        username:" "
    })}

}
