import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { HubService } from './services/hub-service/hub.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{

  title = 'TestingHttpInterceptor';
  image=this._image.image

  constructor(private _image:HubService){}
  ngOnInit()
  {

  }


  GetImage=
  {
    'background-image' : this.image
  }


}
