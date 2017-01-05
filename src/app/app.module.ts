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
import {ActionService, LocalActionService} from "./action.service";
import {ActionManagerComponent} from './action-manager/action-manager.component';
import {ActionCategoryEditorComponent} from './action-category-editor/action-category-editor.component';
import {ActionEditorComponent} from './action-editor/action-editor.component';
import {DropdownModule} from "ng2-bootstrap/dropdown";
import {ModalModule} from "ng2-bootstrap/modal";
import {AlertModule} from "ng2-bootstrap/alert";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginZoneComponent,
    WelcomeComponent,
    AuthQqCreateComponent,
    HomeComponent,
    DashboardComponent,
    ActionManagerComponent,
    ActionCategoryEditorComponent,
    ActionEditorComponent
  ],
  imports: [
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BrowserModule,
    FormsModule,
    JsonpModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [SessionService, AuthService,
    {provide: ActionService, useClass: ActionService}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
