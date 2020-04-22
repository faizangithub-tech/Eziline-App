import { Component, OnInit,AfterViewInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AlertService } from 'src/app/services/alertify/alert.service';
import { Model } from 'src/app/models/paginate/model';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements AfterViewInit, OnInit
{


  pages=[];

  @Input()  entity:[]
  @Output() emitrecords:EventEmitter<any>=new EventEmitter<any>();
  TotalRecords:number
  pagesize=3
  pageset:number


  constructor(private _alert:AlertService){}

  ngOnInit()
  {

        let pageset=this.GetPageSet();
            this.pageset=pageset
        this.setpagelist(pageset)

  }

  ngAfterViewInit()
  {
    let array1=new Array()
    Object.assign(array1,this.entity)

    var getset=array1.slice(0,this.pagesize)
        this.emitrecords.emit(getset)

    if(this.pages.length>0)
    {
           let btns=document.getElementsByClassName('mat-button')
               btns[0].classList.add('active')
    }

  }

  paginate(event:any)
  {

            let targetid=event.srcElement.offsetParent.id as string

            if(targetid)
            {
                event.srcElement.offsetParent.classList.add('active')

                let collection=event.target.offsetParent.parentNode.children as HTMLCollection

                for(let i=1;i<collection.length-1;i++)
                {
                      if(collection[i].id!=targetid)
                      {
                         collection[i].classList.remove('active')
                      }
                }
                this.TransmitRecord(collection,targetid)
            }
  }

  TransmitRecord(Collection:HTMLCollection,Targetid:string)
  {
    console.log("Collection??",Collection)
    console.log("Pginate Method??",Targetid)
    let array=new Array()
        Object.assign(array,this.entity)

            for(let i=1;i<Collection.length-1;i++)
            {
                 if(Collection[i].id==Targetid)
                 {
                        var pageno=Collection[i].textContent
                        var skip=(parseInt(pageno)-1)*this.pagesize
                        let remove=array.splice(0,skip)
                        console.log("Skipped Records",remove,"skip value",skip)
                        let getset=array.slice(0,this.pagesize)
                        console.log("Set of record",getset)
                        this.emitrecords.emit(getset)
                 }
            }
            console.log("Orignal Array",this.entity,"Local Array",array)
  }

  GetPageSet()
  {
    this.TotalRecords=this.entity.length
    let float=this.TotalRecords/this.pagesize
    let pageset=Math.ceil(float)

    return pageset
  }
  setpagelist(pageset:number)
  {
    if(pageset>4)
    {
          for(let i=1;i<=4;i++)
          {
                this.pages.push(i)
          }
    }
    else
    {
         for(let i=1;i<=pageset;i++)
         {
                this.pages.push(i)
         }
    }

  }

  next(event)
  {
       let collection= event.target.offsetParent.offsetParent.children

                for(let i=1;i<collection.length-1;i++)
                {
                      for(let j=0;j<collection[i].classList.length;j++)
                      {
                                 if(collection[i].classList[j]=='active')
                                 {
                                     if(i<collection.length-2)
                                     {
                                          console.log("------------------------")
                                          let nextsibling= collection[i+1]
                                          console.log("Next sibling element",nextsibling)
                                          let targetid=nextsibling.id
                                          console.log("targeted id",targetid)
                                          var element=document.getElementById(targetid) as HTMLElement

                                              element=element.querySelector('span')
                                              element.click();
                                              return
                                          console.log("-------------------------")
                                     }
                                     else
                                     {
                                         console.log("---WELCOME FOR TO DO LIST OPERATION---")

                                         let last=this.pages[i-1]
                                         let newitem=last+1
                                         if(newitem<this.pageset)
                                         {
                                               this.pages.shift()
                                               this.pages.push(newitem)
                                         }
                                         else
                                         {
                                               this._alert.error("No More Records Found..!!")
                                         }
                                     }
                                 }
                      }
                }
  }

  prev(event)
  {
    console.log("EVENT",event)
    let collection= event.target.offsetParent.offsetParent.children
    console.log("Collection",collection)
    for(let i=1;i<collection.length-1;i++)
    {
          for(let j=0;j<collection[i].classList.length;j++)
          {
                     if(collection[i].classList[j]=='active')
                     {
                         console.log("index of collection",i)
                         if(i>1)
                         {
                              console.log("------------------------")
                              let prevsibling= collection[i-1]
                              console.log("previous sibling element",prevsibling)
                              let targetid=prevsibling.id
                              console.log("targeted id",targetid)
                              var element=document.getElementById(targetid) as HTMLElement

                                  element=element.querySelector('span')
                                  element.click();
                                  return
                              console.log("-------------------------")
                         }
                         else
                         {
                             console.log("---WELCOME FOR TO DO LIST OPERATION---")
                             let TotalRecords=50
                             let pagesize=5
                             let listnums=TotalRecords/pagesize
                             let first=this.pages[0]
                             let olditem=first-1
                             console.log("Old Item to insert in array",olditem,"first value of array",first)
                             if(olditem>=1)
                             {
                                   console.log("Here i have to restore array")
                                   this.pages.unshift(olditem)
                                   this.pages.pop()
                             }
                         }
                     }
          }
    }

  }

}
