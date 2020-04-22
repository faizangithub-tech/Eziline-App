import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Website } from 'src/app/models/website/website';
import { LoginService } from 'src/app/services/auth-services/login.service';
import { Loggedinuser } from 'src/app/models/users/loggedinuser';
import { HubService } from 'src/app/services/hub-service/hub.service';
import { zoomInRightOnEnterAnimation} from 'angular-animations'
import { Reviewentity } from 'src/app/models/website/reviewentity';
import { FormControl, Validators } from '@angular/forms';
import * as sentiment from 'node_modules/sentiment'
import { AlertService } from 'src/app/services/alertify/alert.service';
import { filter } from 'rxjs/operators';
import { WesitedetailService } from 'src/app/services/websitedetail/wesitedetail.service';
var Sentiment = require('sentiment');

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  animations:
  [
    zoomInRightOnEnterAnimation()
  ]
})
export class ReviewsComponent implements OnInit
{

  webobj:Website
  dummy="../../../../assets/images/dumyuser.png"
  sound="../../../../assets/media/notify_sound.mp3"
  user:Loggedinuser
  state=true
  comments:any[]
  ratingcompids=["ratingcompA","ratingcompB"]
  commtext:string
  sentiment=new Sentiment()
  comment= new FormControl('',[Validators.required,Validators.minLength(100),Validators.maxLength(200)])
  constructor(private _login:LoginService,
              private _hub:HubService,
              private _alert:AlertService,
              private _service:WesitedetailService){
              this.getsubject()
              this.initobj()}

  ngOnInit()
  {
      this.user=this._login._loggedinuser
      console.log("Broadcasted comment",this.comments)
  }
  initobj(){
    this.webobj=this._service.customwebobj
    console.log("Service property??",this._service.customwebobj)}

  getcommenterror()
  {
    return this.comment.hasError('maxlength') ? 'comment must be less than 200 characrers' :
           this.comment.hasError('minlength') ? 'comment must at least 100 characters':
           this.comment.hasError('required') ? 'comment box can not be empty':''
  }
  GetRecords(event)
  {
         this.comments=event
         console.log("filterd output",this.comments)
  }

  Analysis()
  {
        var result=this.sentiment.analyze(this.comment.value)

        if(result.positive.length>0){
           let polarity=this.calpolarity(result)
           let obj=this.SetReview(polarity)
           this.submitreview(obj)}
        else if(result.negative.length>0){
           let negative=Math.floor(Math.random() * (2 - 1 + 1)) + 1
           let obj=this.SetReview(negative)
           this.submitreview(obj)}
        else
           this._alert.error("No sentiment words recognized in your comment!!")
  }
  submitreview(entity:Reviewentity)
  {
         console.log("Entity to be sent to server",entity)
         this._service.submitreview(entity)
                      .subscribe((data)=>
                      {
                             console.log("Successfully recieved entity from a server",data)
                      })
  }
  SetReview(polarity:number)
  {
     let review=new  Reviewentity ();
         review.webid=this.webobj.id
         review.userid=this.user.id
         review.text=this.comment.value
         review.polarity=polarity
         return review
  }

  calpolarity(result)
  {
     console.log("Sentiment analysis result",result)
     let positive=[5,4,3,2,1]
     let total=0;
     let sum=0
     let stringformat=JSON.stringify(result.calculation)
     var polarity= this.sentiment.analyze(stringformat)
     let Tokens=polarity.tokens as Array<string>
                positive.forEach((item)=>{
                  let cast=String(item)
                  let filter=Tokens.filter((value)=>{
                    return value==cast;
                  })
                  total+=filter.length
                   if(filter.length>0)
                        sum+=filter.length*+filter[0]
                })
                let pol=Math.round(sum/total)
                    console.log("final polarity",pol)
      return pol
  }

  getsubject()
  {
    this._hub.comment.subscribe((value)=>
    {
      let sound=new Audio(this.sound)
      let exsist=this.comments
                     .findIndex(x=>x.webid==value.webid)
           if(exsist!=-1)
           {
             sound.play
             console.log("does exsist??",exsist)
             if(this.comments.length==2)
                  this.comments[0]=value
            else
                  this.comments.unshift(value)}
    })
  }




}
