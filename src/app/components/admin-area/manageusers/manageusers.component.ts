import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Userroles } from 'src/app/models/user_roles/userroles';
import { tadaOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { RolesmodelComponent } from '../rolesmodel/rolesmodel.component';
import { Model } from 'src/app/models/paginate/model';
import { MangeusersService } from '../services/mangeusers.service';
import { AlertService } from 'src/app/services/alertify/alert.service';
import { LoginService } from 'src/app/services/auth-services/login.service';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css'],
  animations:[ tadaOnEnterAnimation(), fadeOutOnLeaveAnimation()]
})
export class ManageusersComponent implements OnInit
{
  users=new Array<Userroles>()
  userobjs:Userroles[]
  roles=new Model()
  value=true
  count=0
  list=[1,2,4]
  dummy="../../../../assets/images/employee.png"
  bsModalRef: BsModalRef;
  constructor(private _route:ActivatedRoute,
              private _managuser:MangeusersService,
              private _modalService:BsModalService,
              private _chang:ChangeDetectorRef,
              private _alert:AlertService,
              private _login:LoginService
             )
  {
         this.userobjs= this._route.snapshot.data['users']
         console.log("Iam in manageusers component",this.userobjs)
  }
  ngOnInit()
  {
    this._chang.detectChanges()
  }

  GetRecords(event:any)
  {

     this.value=true
     this.users=event

  }

  editRolesModal(user:Userroles)
  {
    const initialState =
    {
         user,
         roles:this.GetRoles(user)
    };
    this.bsModalRef = this._modalService.show(RolesmodelComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';

    this.updateroles(user)
  }

  GetRoles(user:Userroles)
  {

      let roles=new Model()

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
        return roles.avaroles
  }
  updateroles(user:Userroles)
  {
        let modalroles=this.bsModalRef.content.updatedroles
                           .subscribe((values:any[])=>
                           {
                                let rolenames=values.filter(x=>x.ischecked==true)
                                                    .map(x=>x.name)
                                    user.roles=rolenames
                                    this._managuser.edituserroles(user)
                                                   .subscribe(()=>this._alert.success("Users Roles Updted Successfully!"))
                           })

  }

}
