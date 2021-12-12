import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RouterModule} from "@angular/router";
import {AppComponent} from './app.component';
import {HeaderComponent} from './component/mainpage/header/header.component';
import {HomeComponent} from './component/mainpage/home/home.component';
import {NavBarComponent} from './component/mainpage/nav-bar/nav-bar.component';
import {Overview1Component} from './component/scooter/overview1/overview1.component';
import {Overview2Component} from './component/scooter/overview2/overview2.component';
import {detail2Component} from './component/scooter/detail2/detail2.component';
import {FormsModule} from "@angular/forms";
import {Overview3Component} from './component/scooter/overview3/overview3.component';
import {Detail3Component} from './component/scooter/detail3/detail3.component';
import {ErrorComponent} from './component/mainpage/error/error.component';
import {error} from "@angular/compiler/src/util";
import {Detail4Component} from './component/scooter/detail4/detail4.component';
import {Overview4Component} from './component/scooter/overview4/overview4.component';
import {Overview5Component} from './component/scooter/overview5/overview5.component';
import {Detail5Component} from './component/scooter/detail5/detail5.component';
import {Detail51Component} from './component/scooter/detail51/detail51.component';
import {HttpClient} from "@angular/common/http";
import {ScootersService2} from "./services2/scooters.service2";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {SignOnComponent} from './component/sign-on/sign-on.component';
import {HeaderSbComponent} from './component/mainpage/header-sb/header-sb.component';
import {NavBarSbComponent} from './component/mainpage/nav-bar-sb/nav-bar-sb.component';
import {AuthInterceptorService} from "./auth/auth-interceptor.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavBarComponent,
    Overview1Component,
    Overview2Component,
    detail2Component,
    Overview3Component,
    Detail3Component,
    ErrorComponent,
    Detail4Component,
    Overview4Component,
    Overview5Component,
    Detail5Component,
    Detail51Component,
    SignOnComponent,
    HeaderSbComponent,
    NavBarSbComponent

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'scooters/overview1', component: Overview1Component},
      {path: 'scooters/overview2', component: Overview2Component},
      {path: 'scooters/overview3', component: Overview3Component},
      {path: 'login', component: SignOnComponent},

      {
        path: 'scooters/overview4', component: Overview4Component, children: [
          {path: "edit", component: Detail4Component}
        ]
      },

      {
        path: 'scooters/overview5', component: Overview5Component, children: [
          {path: "edit", component: Detail5Component}
        ]
      },

      {
        path: 'scooters/overview6', component: Overview5Component, children: [
          {path: "edit", component: Detail51Component}
        ]
      },


      // {path: 'signup', component: },
      // {path: 'login', component: },
      {path: '**', component: ErrorComponent},
    ])
  ],
  providers: [HttpClient,
    ScootersService2,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
