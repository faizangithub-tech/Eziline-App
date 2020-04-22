import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { WesitedetailService } from 'src/app/services/websitedetail/wesitedetail.service';
import { Website } from 'src/app/models/website/website';
import { Ratings } from 'src/app/models/website/ratings';
import { HubService } from 'src/app/services/hub-service/hub.service';
import { AlertService } from 'src/app/services/alertify/alert.service';
import { RatingStarsComponent } from '../rating-stars/rating-stars.component';
import { bounceInUpOnEnterAnimation} from 'angular-animations'

@Component({
  selector: 'app-average-ratings',
  templateUrl: './average-ratings.component.html',
  styleUrls: ['./average-ratings.component.css'],
  animations:[bounceInUpOnEnterAnimation()]
})
export class AverageRatingsComponent implements OnInit, AfterViewInit {

  webobj:Website
  avgratings:Object
  model:Ratings[]
  uniqueid="ratingcompC"
  ischanged:number
  state=true

  constructor(private _service:WesitedetailService,
              private _hub:HubService,
              private _alert:AlertService){
              this.updateratings()
              this.initobj()}

  ngOnInit()
  {
            this._service.getratings(this.webobj.id)
                         .subscribe((data:any)=>
                         {
                            if(data!=null)
                                 {this.model=data.ratinglist
                                  this.avgratings=data.averagerating}
                                  console.log("average rating",this.avgratings,"rating-list",this.model)
                         })
  }
  initobj(){
      this.webobj=this._service.customwebobj}

  getactivestars(event)
  {
      console.log(" Activ Rating  Compoment",event)
  }
  ngAfterViewInit(){}


  GetColor(index)
  {
      let styles=
      {'background-color' :this.model[index].polarity==5 ? 'goldenrod':
                           this.model[index].polarity==4 ? 'gold':
                           this.model[index].polarity==3 ? 'yellow':
                           this.model[index].polarity==2 ? 'orange':
                           this.model[index].polarity==1 ? 'orangered': ''}
      return styles
  }

  updateratings()
  {
       this._hub.updateratings
                .subscribe((value)=>
                {
                    if(this.avgratings!=null)
                    {
                        this.avgratings=value[1]
                        this.model=value[0]
                        console.log("Updated Average Rating Broadcasted",this.avgratings,"Percent",this.model)}
                })
  }
  IsActiveComp()
  {
    this._hub.isactive.subscribe((value)=>
    {

          this.ischanged=value})
  }

}
