import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from 'src/app/components/admin-area/admin/admin.component';
import { ManageusersComponent } from 'src/app/components/admin-area/manageusers/manageusers.component';
import { ManagesitesComponent } from 'src/app/components/admin-area/managesites/managesites.component';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { ManageuserResolverService } from 'src/app/resolvers/manageuser-resolver.service';
import { ManagewebsiteService } from 'src/app/components/admin-area/services/managewebsite.service';
import { ManagewebsiteResolverService } from 'src/app/resolvers/managewebsite-resolver.service';

const routes:Routes=
[
  {
    path:'',component:AdminComponent,
    canActivate:[AdminGuard],
    data:{roles:['Admin','Moderator']},
    children:
    [
      {path:'manageusers',component:ManageusersComponent,resolve:{users:ManageuserResolverService}},

      {path:'managesites',component:ManagesitesComponent,resolve:{websites:ManagewebsiteResolverService}},

      {path:'',redirectTo:'admin',pathMatch:'full'}
    ]
  }
]

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminroutingModule { }
