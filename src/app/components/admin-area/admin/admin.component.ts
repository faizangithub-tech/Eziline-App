import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit
{

  constructor(private _route:Router){ }

  ngOnInit() {}

  sites()
  {

  }
  users()
  {
    this._route.navigate(['users'])
  }
  loadrouter()
  {
    console.log("Hi!! it is working")
  }

}
