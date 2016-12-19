import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../auth.service";

@Component({
  selector: 'login-zone',
  templateUrl: './login-zone.component.html',
  styleUrls: ['./login-zone.component.css']
})
export class LoginZoneComponent implements OnInit {
  qqAuthUrl: Observable<string>;
  loginActive = true;
  regActive = false;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.qqAuthUrl = this.auth.qqAuthUrl();
  }

  activeLogin() {
    this.loginActive = true;
    this.regActive = false;
  }

  activeRegister() {
    this.loginActive = false;
    this.regActive = true;
  }

}
