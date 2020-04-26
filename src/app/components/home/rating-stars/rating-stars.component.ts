import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { AlertService } from 'src/app/services/alertify/alert.service';
import { HubService } from 'src/app/services/hub-service/hub.service';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.css']
})
export class RatingStarsComponent implements AfterViewInit,OnInit
{

  ratings=[2.3,4.3,3.3,1,5]
  viewloaded=false
  rating:number

  @Input() uniqueid:string
  constructor(private _alert:AlertService,private _hub:HubService){
             }
  ngOnInit(){}

  @Input()
  set updaterating(rating)
  {
        this.rating=rating
        console.log("View Loaded Property",this.viewloaded)
        if(this.viewloaded==true)
        {
          console.log("Fired Second Time")
          this.styleavgrating()}}


  ngAfterViewInit()
  {
            console.log("Rating??",this.rating)
            this.viewloaded=true
            console.log("View Loaded Property",this.viewloaded)
            if(Number.isInteger(this.rating))
            {
                     this.stylerating()}
            else
            {
                     this.styleavgrating()}
  }

  stylerating()
  {
            console.log("Unique ID??",this.uniqueid)
            var ratingcomp=document.getElementById(this.uniqueid)
                console.log("Element by ID",ratingcomp)
            var starlist=ratingcomp.getElementsByClassName("stars-inner")
            let getid=starlist[this.rating-1].id
            let polarity=+this.rating
                for(let start=+getid;start>=0;start--)
                {
                  var element = starlist[start] as HTMLElement
                      element.style.width="100%"}}

  styleavgrating()
  {
    console.log("I am in styleavgrating method!!")
    var collection=document.getElementById("ratingcompC")
    let innerstars=collection.getElementsByClassName("stars-inner")
        console.log("Collection!!",innerstars)
        console.log("Input rating property",this.rating)
        let input=JSON.stringify(this.rating)
        let elem=+input[0]
        let avg=+this.rating
        const percentage=(avg/5)*100
        const rounded= `${Math.round(percentage)}%`
        for(let start=elem-1;start>=0;start--){
             var element=innerstars[start] as HTMLElement
                 element.style.width="100%"}
                 let nextsibling=innerstars[elem] as HTMLElement
                     nextsibling.style.width=rounded}}








