import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Userroles } from 'src/app/models/user_roles/userroles';
import { Model } from 'src/app/models/paginate/model';
import { AlertService } from 'src/app/services/alertify/alert.service';

@Component({
  selector: 'app-rolesmodel',
  templateUrl: './rolesmodel.component.html',
  styleUrls: ['./rolesmodel.component.css']
})
export class RolesmodelComponent implements OnInit
{

  user:Userroles
  roles:any[]
  ischanged=false
  @Output() updatedroles=new EventEmitter<any>()
  constructor(public bsModalRef: BsModalRef,private _alert:AlertService){}
  ngOnInit()
  {
  }

  updateroles()
  {
       console.log("updated roles",this.roles)
         this.updatedroles.emit(this.roles)
  }
  listvalue(roles)
  {
     this.ischanged=true
  }

}
