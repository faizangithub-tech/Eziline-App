import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { flipOutXOnLeaveAnimation, flipInXOnEnterAnimation} from 'angular-animations'
import { ActivatedRoute, Router } from '@angular/router';
import { Website } from 'src/app/models/website/website';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.css'],
  animations:
  [
    flipInXOnEnterAnimation(),
    flipOutXOnLeaveAnimation()
  ]
})
export class WebsitesComponent implements OnInit
{
  state=true
  websites=new Array<Website>()
  webobjs=new Array<Website>()

  constructor(
              private _route:ActivatedRoute,
              private _navigate:Router,
              private _chang:ChangeDetectorRef,)
  {
    this.websites=this._route.snapshot.data['websites']
  }
  ngOnInit()
  {
     this._chang.detectChanges()
  }

  GetRecords(event:any)
  {

      this.webobjs=event

  }

  navigate(obj:Website)
  {
       window.open(obj.link,"_blank")
  }
  Details(obj:Website)
  {
          this.state=false
          setTimeout(()=>
          {
               this._navigate.navigate(['Home/details/',obj.id])
          })
  }

}
