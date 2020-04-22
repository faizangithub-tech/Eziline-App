import { NgModule } from '@angular/core';
import {MatFormFieldModule, MatError} from '@angular/material/form-field';
import {MatButtonModule,MatInputModule, MatIconModule, MatMenuModule, MatToolbarModule, MatSidenavModule, MatListModule, MatTabsModule, MatCardModule, MatSelectModule, MatCheckboxModule} from '@angular/material'



@NgModule({
  declarations:
  [
  ],
  imports:
  [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTabsModule
  ],
  exports:
  [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule
  ]
})
export class MaterialModule { }
