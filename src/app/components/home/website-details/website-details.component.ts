import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Website } from 'src/app/models/website/website';
import { bounceInDownOnEnterAnimation, bounceOutDownOnLeaveAnimation } from 'angular-animations';
import { Subject } from 'rxjs';
import { HubService } from 'src/app/services/hub-service/hub.service';
import { WesitedetailService } from 'src/app/services/websitedetail/wesitedetail.service';

@Component({
  selector: 'app-website-details',
  templateUrl: './website-details.component.html',
  styleUrls: ['./website-details.component.css'],
  animations:[
    bounceInDownOnEnterAnimation(),
    bounceOutDownOnLeaveAnimation(),
  ]
})
export class WebsiteDetailsComponent implements OnInit
{

  obj:Website
  state=true
  display=false
  constructor(private  _route:ActivatedRoute,
              private _hub:HubService,
              private _web:WesitedetailService){
         let websiteid= this._route.snapshot.params['id']
         let resolvedentity=this._route.snapshot.data['detailedid']
               this.obj=resolvedentity}


  ngOnInit(){
    this._web.customwebobj=this.obj
    console.log("Does Entity Set in Service??",this._web.customwebobj)}

  navigate(obj:Website)
  {
       window.open(obj.link,"_blank")
  }

  getactivestars(event)
  {
     if(event==1){
       this._hub.isactive.next(event)
       this.display=true}
       else{
       this.display=false}
  }
}
