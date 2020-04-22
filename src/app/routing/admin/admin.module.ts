import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent} from '../../components/admin-area/admin/admin.component'
import { ManageusersComponent} from '../../components/admin-area/manageusers/manageusers.component'
import { ManagesitesComponent} from '../../components/admin-area/managesites/managesites.component'
import { AdminroutingModule } from './adminrouting.module';
import { MaterialModule } from 'src/app/material/material.module';
import { MangeusersService } from 'src/app/components/admin-area/services/mangeusers.service';
import { ManageuserResolverService } from 'src/app/resolvers/manageuser-resolver.service';
import { PaginateComponent } from 'src/app/components/admin-area/paginate/paginate.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RolesmodelComponent } from 'src/app/components/admin-area/rolesmodel/rolesmodel.component';
import { ModalModule} from 'ngx-bootstrap'
import { ManagewebsiteService } from 'src/app/components/admin-area/services/managewebsite.service';
import { ManagewebsiteResolverService } from 'src/app/resolvers/managewebsite-resolver.service';
import { routingcomponent } from '../routing.module';
import { PaginateModule } from 'src/app/paginate/paginate.module';
@NgModule
({
  declarations:
  [
    AdminComponent,
    ManageusersComponent,
    ManagesitesComponent,
    RolesmodelComponent,
  ],
  imports:
  [
    CommonModule,
    AdminroutingModule,
    MaterialModule,
    PaginateModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  providers:
  [
    ManageuserResolverService,
    MangeusersService,
    ManagewebsiteService,
    ManagewebsiteResolverService
  ],
  entryComponents:
  [
    RolesmodelComponent
  ]
})
export class AdminModule { }
