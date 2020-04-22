import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alertify/alert.service';

@Component({
  selector: 'app-authoraize',
  templateUrl: './authoraize.component.html',
  styleUrls: ['./authoraize.component.css']
})
export class AuthoraizeComponent implements OnInit
{

  constructor(private _alert:AlertService){}

  ngOnInit()
  {

  }


}
