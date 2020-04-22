import { Directive, Input, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth-services/login.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasroleDirective implements OnInit
{
  @Input() appHasRole:{roles:string[]}
  isvisible=false
  constructor(private _auth:LoginService,
              private _ViewContainerRef:ViewContainerRef,
              private _TemplateRef:TemplateRef<any>){ }

  ngOnInit()
  {
         console.log("Hi!! iam in a apphas role custom directive")
         console.log("Initial status of isvisible property",this.isvisible)
         const userroles= this._auth.getdecodedtoken()

         if(!userroles)
         {
            this._ViewContainerRef.clear()
            console.log("User not enrolled in any role!!")
         }
         if(this._auth.rolematch(this.appHasRole))
         {
              if(!this.isvisible)
              {
                 console.log("visisble var is  true")
                 this.isvisible=true
                 this._ViewContainerRef.createEmbeddedView(this._TemplateRef)
              }
              else
              {
                 console.log("Here i would have to remove html element!!")
                 this.isvisible=false
                 this._ViewContainerRef.clear()
              }
         }
  }
}
