import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {LoginZoneComponent} from './login-zone/login-zone.component';
import {AppRoutingModule} from "./app-routing.module";
import {WelcomeComponent} from './welcome/welcome.component';
import {AuthService} from "./auth.service";
import {SessionService} from "./session.service";
import {AuthQqCreateComponent} from './auth-qq-create/auth-qq-create.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ActionService} from "./action.service";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginZoneComponent,
    WelcomeComponent,
    AuthQqCreateComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    JsonpModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [SessionService, AuthService, ActionService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
