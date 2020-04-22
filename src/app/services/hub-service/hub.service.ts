import { Injectable } from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@aspnet/signalr'
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HubService
{

  image="../assets/back-ground/07_halloween_characters_paint3d_0002_group-10_resized.jpg"
  connection:HubConnection
  newcomment:any
  comment:Subject<any>=new Subject<any>()
  updateratings:Subject<any>=new Subject<any>()
  isactive:Subject<any>=new Subject()
  constructor(private _route:Router){}

  buildconnection()
  {

    let hubconnection = new HubConnectionBuilder()
                        .withUrl("http://localhost:5000/notify")
                        .build()
    hubconnection.start()
                 .then(()=>
                 {
                       console.log("conection established successfully!!")
                       this.connection=hubconnection

                       this._route.navigate(['/Home'])

                       this.callhubfunctions();
                 }).catch(()=>{console.log("failed to build a connection")})

  }

  callhubfunctions()
  {
       this.connection.on("sendcomment",(data)=>
               {this.comment.next(data)})

       this.connection.on("sendratings",(data)=>
       {
         console.log("Broadcasted updated Ratings",data)
         this.updateratings.next(data)})


       this.connection.on("newratings",(data)=>
       {
               console.log("Broadcasted Ratings",data)
       })
  }

}
