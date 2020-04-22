import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Website } from 'src/app/models/website/website';
import { LoginService } from 'src/app/services/auth-services/login.service';
import { ManagewebsiteService } from '../services/managewebsite.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alertify/alert.service';
import {zoomInUpOnEnterAnimation, zoomOutUpOnLeaveAnimation} from 'angular-animations'

@Component({
  selector: 'app-managesites',
  templateUrl: './managesites.component.html',
  styleUrls: ['./managesites.component.css'],
  animations:
  [
    zoomInUpOnEnterAnimation(),
    zoomOutUpOnLeaveAnimation(),
  ]
})
export class ManagesitesComponent implements OnInit
{
  selectedfile=null
  name="no file selected"
  percentdone
  uploaded=false
  modify=false
  state=true
  website=new Array<Website>()
  dbrecords:Website[]
  entity:any
  pageno=1
  pagesize=2

  constructor(private _storage:AngularFireStorage,
              private _login:LoginService,
              private _web:ManagewebsiteService,
              private _route:ActivatedRoute,
              private _alert:AlertService,
             )
             {
               this.dbrecords=this._route.snapshot.data['websites']
               console.log("Get Data After Route Resolved",this.dbrecords)
             }

  ngOnInit()
  {
        let array=new Array()
            Object.assign(array,this.dbrecords)
            console.log("Array",array)
        var skip=(this.pageno-1)*this.pagesize
        let sectionremoved=array.splice(0,skip)
            console.log("Removed Section",sectionremoved)
        let get=array.slice(0,this.pagesize)
            console.log("GET SET ",get)
            this.website=get
  }
  next()
  {
     this.pageno += 1
     let array=new Array()
            Object.assign(array,this.dbrecords)
            var skip=(this.pageno-1)*this.pagesize
            if(skip<this.dbrecords.length)
            {
            let sectionremoved=array.splice(0,skip)
                let get=array.slice(0,this.pagesize)
                this.website=get
            }
            else
            {
               this._alert.error("No More Records Exsist!!")
            }
  }
  prev()
  {

    this.pageno -= 1
     let array=new Array()
         Object.assign(array,this.dbrecords)
           if(this.pageno>=1)
           {

            var skip=(this.pageno-1)*this.pagesize
            let sectionremoved=array.splice(0,skip)
                let get=array.slice(0,this.pagesize)
                this.website=get
           }
  }
  form=new FormGroup
  ({
     id:new FormControl(''),
     name:new FormControl('',[Validators.required]),
     link:new FormControl('',[Validators.required]),
     title:new FormControl('',[Validators.required]),
     description:new FormControl('',[Validators.required,Validators.minLength(200),Validators.maxLength(400)]),
     coverimage:new FormControl('',[Validators.required]),
     userid:new FormControl('')
  });

  getnameerror()
  {
       return this.form.get("name").hasError('required') ? 'field can not be left empty' :
              this.form.get("link").hasError('required') ? 'field can not be left empty':
              this.form.get("title").hasError('required') ? 'field can not be left empty':
              this.form.get("coverimage").hasError('required') ? 'field can not be left empty': ''
  }

  getdescrperror()
  {
    return this.form.get("description").hasError('maxlength') ? 'description must be less than 200 characrers' :
           this.form.get("description").hasError('minlength') ? 'your description must at least 100 characters' :
           this.form.get("description").hasError('required') ? 'field can not be left empty' : ''
  }

  onselectedfile(event)
  {
        this.selectedfile=event.target.files[0]
        this.name=this.selectedfile.name
  }

  navigate(obj:Website)
  {
     console.log("Object of website is",obj)
     window.open(obj.link,"_blank")
  }

  upload()
  {

    let filepath=`media/${this.selectedfile.name}_${new Date().getTime()}`
    let fileref=this._storage.ref(filepath)
    this.uploaded=true
               this._storage.upload(filepath,this.selectedfile)
                            .snapshotChanges()
                            .pipe
                            (
                                  finalize(()=>
                                  {
                                       fileref.getDownloadURL()
                                              .subscribe((url)=>
                                              {
                                                  this.form.get("coverimage").setValue(url)
                                                  this.uploaded=false
                                              })
                                  })
                            ).subscribe((event)=>
                            {
                              this.percentdone=Math.round((event.bytesTransferred/event.totalBytes)*100)
                              console.log(this.percentdone,"percentdone")
                            })
  }


  submit()
  {

    let website=new Website()
        website=this.form.value
        website.userid=this._login._loggedinuser.id
        this._web.addwebsite(website)
                 .subscribe((data)=>
                 {
                   this.dbrecords.unshift(data)
                   if(this.website.length<2)
                             this.website.unshift(data)
                             else
                             this.website[0]=this.dbrecords[0]

                    this._alert.success("Record Successfully Added!!")
                 })
  }

  populate(obj:Website)
  {
      this.modify=true
      this.entity=obj
      this.form.setValue
      ({
          id:obj.id,
          name:obj.name,
          link:obj.link,
          title:obj.title,
          description:obj.description,
          coverimage:obj.coverimage,
          userid:obj.userid
      })
  }

  update()
  {
      let entity=new Website()
          entity=this.form.value
          this._web.updatewebsite(entity)
                   .subscribe((data=>
                    {

                         let dbobj0 =this.website.find(x=>x.id==data.id);
                         let dbobj1 =this.dbrecords.find(x=>x.id==data.id);
                         let index0 =this.website.indexOf(dbobj0)
                         let index1 =this.dbrecords.indexOf(dbobj1);
                                     this.website[index0]=data
                                     this.dbrecords[index1]=data
                                     this.modify=false
                         this._alert.success("entity updated successfully")
                    }))
  }

  delete(obj:Website)
  {
     let entity =new  Website();
         entity=obj
           this._web.deletewebsite(entity)
                    .subscribe((data)=>
                    {
                      this.state=false
                      let indexo=this.website.indexOf(entity)
                      let indexb=this.dbrecords.indexOf(entity)
                                 this.website.splice(indexo,1)
                                 this.dbrecords.splice(indexb,1)
                           this._alert.success("Entity Deleted Successfully")
                    })
  }


}
