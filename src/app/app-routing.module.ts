import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from "./app.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {AuthQqCreateComponent} from "./auth-qq-create/auth-qq-create.component";
import {HomeComponent} from "./home/home.component";
import {ActionManagerComponent} from "./action-manager/action-manager.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'action', component: ActionManagerComponent},
  {path: 'auth/qq/create', component: AuthQqCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
