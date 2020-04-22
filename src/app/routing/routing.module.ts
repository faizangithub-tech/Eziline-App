import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule} from '@angular/router';
import { LoginComponent } from '../components/authcompo/login/login.component';
import { MainNavComponent } from '../components/home/main-nav/main-nav.component';
import { SignupComponent } from '../components/authcompo/signup/signup.component';
import { AuthGuard } from '../guards/auth.guard';
import { WebsitesComponent } from '../components/home/websites/websites.component';
import { AdminGuard } from '../guards/admin.guard';
import { WebsiteGuard } from '../guards/website.guard';
import { AuthoraizeComponent } from '../components/home/authoraize/authoraize.component';
import { ManagewebsiteResolverService } from '../resolvers/managewebsite-resolver.service';
import { PaginateComponent } from '../components/admin-area/paginate/paginate.component';
import { WebsiteDetailsComponent } from '../components/home/website-details/website-details.component';
import { WebsitedetailResolverService } from '../resolvers/websitedetail-resolver.service';
import { RatingStarsComponent } from '../components/home/rating-stars/rating-stars.component';
import { ReviewsComponent } from '../components/home/reviews/reviews.component';
import { AverageRatingsComponent } from '../components/home/average-ratings/average-ratings.component';


export const routes: Routes =
[

  {
    path:'login',component:LoginComponent
  },

  {
    path:'Home',component:MainNavComponent,
    canActivate:[AuthGuard],
    children:
    [
         {
           canActivate:[WebsiteGuard],
           data:{roles:['Member','Moderator','Vip','Admin']},
           path:'websites',component:WebsitesComponent,
           resolve:{websites:ManagewebsiteResolverService}
         },
         {
           path:'details/:id',component:WebsiteDetailsComponent,
           resolve:{detailedid:WebsitedetailResolverService},
           children:
           [
             {path:'reviews',component:ReviewsComponent},
             {path:'details/ratings',component:AverageRatingsComponent},
            //  {path:'',redirectTo:'reviews',pathMatch:'full'}
           ]
         },
         {
            path:'admin',loadChildren:()=>import(`../routing/admin/admin.module`).then(m=>m.AdminModule)
         },
         {path:'denied',component:AuthoraizeComponent},
         {path:'',redirectTo:'websites',pathMatch:'full'}
    ]
  },
  {path:'signup',component:SignupComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'}
];


@NgModule
({

  imports:
  [
    RouterModule.forRoot(routes),
  ],
  exports:[RouterModule]
})
export class RoutingModule { }
export const routingcomponent=
[
  LoginComponent,
  MainNavComponent,
  SignupComponent,
]
