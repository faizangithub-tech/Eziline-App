import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { routingcomponent, RoutingModule } from './routing/routing.module';
import { JwtModule }from '@auth0/angular-jwt'
import { LoginService } from './services/auth-services/login.service';
import { LayoutModule } from '@angular/cdk/layout';
import { AlertService } from './services/alertify/alert.service';
import { AdminGuard } from './guards/admin.guard';
import { MaterialModule } from './material/material.module';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { HasroleDirective } from './components/admin-area/directives/hasrole.directive';
import { CloudsetupModule } from './cloudsetup/cloudsetup.module';
import { WebsitesComponent } from './components/home/websites/websites.component';
import { WebsiteGuard } from './guards/website.guard';
import { AuthoraizeComponent } from './components/home/authoraize/authoraize.component';
import { AdminModule } from './routing/admin/admin.module';
import { PaginateComponent } from './components/admin-area/paginate/paginate.component';
import { PaginateModule } from './paginate/paginate.module';
import { WebsiteDetailsComponent } from './components/home/website-details/website-details.component';
import { WesitedetailService } from './services/websitedetail/wesitedetail.service';
import { ReviewsComponent } from './components/home/reviews/reviews.component';
import { AverageRatingsComponent } from './components/home/average-ratings/average-ratings.component';
import { NavigationComponent } from './components/home/navigation/navigation.component';
import { RatingStarsComponent } from './components/home/rating-stars/rating-stars.component';
export function tokenGetter()
{
  return localStorage.getItem('token');
}

@NgModule({
  declarations:
   [
    AppComponent,
    routingcomponent,
    HasroleDirective,
    WebsitesComponent,
    AuthoraizeComponent,
    WebsiteDetailsComponent,
    ReviewsComponent,
    AverageRatingsComponent,
    NavigationComponent,
    RatingStarsComponent
  ],
  imports:
  [
    RoutingModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    CloudsetupModule,
    PaginateModule,
    JwtModule.forRoot
    ({
      config:
      {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5000"],
        blacklistedRoutes: ["localhost:5000/api/Auth"]
      }
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LayoutModule,
    FormsModule,
    ButtonsModule.forRoot()
  ],
  providers:
  [
    LoginService,
    AlertService,
    AdminGuard,
    WesitedetailService,
    WebsiteGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
