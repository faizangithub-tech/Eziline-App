import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginateComponent } from '../components/admin-area/paginate/paginate.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations:
  [
    PaginateComponent
  ],
  imports:
  [
    MaterialModule,
    CommonModule
  ],
  exports:
  [
    PaginateComponent
  ]
})
export class PaginateModule { }
