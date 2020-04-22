import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule} from '@angular/fire';
import { AngularFireStorageModule} from '@angular/fire/storage'

export const environment =
{
  production: false,
  firebase:
  {
    apiKey: 'AIzaSyDi-IwWxGqPoif8qRUl9Ob1omYv20RvFG4',
    authDomain: 'knowledgeislight-facaa.firebaseapp.com',
    databaseURL: 'https://knowledgeislight-facaa.firebaseio.com',
    projectId: 'knowledgeislight-facaa',
    storageBucket: 'knowledgeislight-facaa.appspot.com',
    messagingSenderId: '256102143993'
  }
};

@NgModule({
  declarations: [],
  imports:
  [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ]
})
export class CloudsetupModule { }
