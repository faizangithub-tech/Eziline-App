import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from 'src/app/services/auth-services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit
{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  dummy="../../../../assets/images/dumyuser.png"
  star="../../../../assets/images/star (1).png"
  constructor(private breakpointObserver: BreakpointObserver,
    private loggedin:LoginService,
    private route:Router ) {}


  ngOnInit()
  {
    console.log("it is not working bro!!")
  }

  logout(){
         localStorage.clear()
         sessionStorage.clear()
         this.route.navigate(['login'])}

}
