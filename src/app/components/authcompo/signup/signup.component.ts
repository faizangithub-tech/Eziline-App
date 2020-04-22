import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  form=new FormGroup
  ({
     email   :new FormControl('',[Validators.required,Validators.email]),
     password:new FormControl('',[Validators.required]),
     username:new FormControl('',[Validators.required])
  });


}
