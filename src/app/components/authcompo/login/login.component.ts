import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from 'src/app/models/users/login';
import { LoginService } from 'src/app/services/auth-services/login.service';
import { HubService } from 'src/app/services/hub-service/hub.service';
import { Router } from '@angular/router';
import { Userroles } from 'src/app/models/user_roles/userroles';
import { Model } from 'src/app/models/paginate/model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{

  constructor(private _login:LoginService,private _hub:HubService,private _route:Router) { }
  ngOnInit(){}
  test=[1]
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
    this._login.login(user).subscribe((data)=>
    {
            this._hub.buildconnection();
    })
  }

  populate()
  {
    let user=new Userroles()
        user.id=1
        user.username="Mohammad"
        user.roles.push("Moderator")
        user.roles.push("Admin")

    let roles=new Model()
        console.log("Dummy User",user)
        console.log("Roles before Operate",roles)

        for(let i=0;i<user.roles.length;i++)
        {
                for(let j=0;j<roles.avaroles.length;j++)
                {
                       if(user.roles[i]==roles.avaroles[j].name)
                       {
                          roles.avaroles[j].ischecked=true
                       }
                }
        }
        this.checklist=roles
        console.log("Edit Roles Modal Prototype",roles)


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
  this._route.navigate(['/signup'])
}

}
