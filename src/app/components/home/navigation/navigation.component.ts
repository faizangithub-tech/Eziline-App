import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WebsitedetailResolverService } from 'src/app/resolvers/websitedetail-resolver.service';
import { WesitedetailService } from 'src/app/services/websitedetail/wesitedetail.service';
import { Website } from 'src/app/models/website/website';
import { AlertService } from 'src/app/services/alertify/alert.service';
import { HubService } from 'src/app/services/hub-service/hub.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit
{

  pageno=1

  pagesize=2

  entity:Website

  @Output() filterd:EventEmitter<any>=new EventEmitter<any>()

  records=new Array<any>()
  constructor(private _webservice:WesitedetailService,
              private _alert:AlertService,
              private _hub:HubService){
              this.getsubscription()
              this.initobj()}

  ngOnInit()
  {

    this._webservice.getallreviews(this.entity.id)
                    .subscribe((data:any[])=>
                    {
                         this.records=data
                         let array=new Array()
                         Object.assign(array,this.records)
                         var skip=(this.pageno-1)*this.pagesize
                         let sectionremoved=array.splice(0,skip)
                         let get=array.slice(0,this.pagesize)
                         this.filterd.emit(get)
                         console.log("Loaded records!!",this.records)
                    })

  }
  initobj(){
    this.entity=this._webservice.customwebobj
    console.log("navigation init obj method !!",this.entity)}

  nextsection()
  {

     this.pageno += 1
     let array=new Array()
         Object.assign(array,this.records)
     var skip=(this.pageno-1)*this.pagesize
          if(skip<this.records.length){
                let sectionremoved=array.splice(0,skip)
                let get=array.slice(0,this.pagesize)
                this.filterd.emit(get)}
          else{
               this._alert.error("No More Records Exsist!!")}
  }

  backsection()
  {

        this.pageno -= 1
        let array=new Array()
        Object.assign(array,this.records)
        if(this.pageno>=1){
           var skip=(this.pageno-1)*this.pagesize
           let sectionremoved=array.splice(0,skip)
           let get=array.slice(0,this.pagesize)
               this.filterd.emit(get)}
  }

  getsubscription()
  {
    this._hub.comment
             .subscribe((value)=>{
              let exsist=this.records.findIndex(x=>x.webid==value.webid)
                  if(exsist!=-1)
                  {
                      this.records.unshift(value)}})
  }


}
