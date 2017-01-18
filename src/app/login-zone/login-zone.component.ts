import {
  Component, OnInit, trigger,
  state, style, animate, transition
} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../auth.service";
import {ActivatedRoute} from "@angular/router";
import {controlPath} from "@angular/forms/src/directives/shared";
import {isUndefined} from "util";
import {sha1} from "@angular/compiler/src/i18n/digest";
import {SessionService} from "../session.service";
import {Alert} from "../po";

@Component({
  selector: 'login-zone',
  templateUrl: './login-zone.component.html',
  styleUrls: ['./login-zone.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('*', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate('200ms ease-in')
      ])
    ])
  ]
})
export class LoginZoneComponent implements OnInit {
  qqAuthUrl: string;
  loginActive = true;
  regActive = false;
  private email: string;
  private pass: string;
  private confirmPass: string;
  private name: string;
  private errors: Alert[] = [];

  constructor(private auth: AuthService, private route: ActivatedRoute, private sess: SessionService) {
  }

  ngOnInit() {
    this.auth.qqAuthUrl.subscribe(url => {
      this.qqAuthUrl = url;
    });
    this.route.fragment.subscribe(v => {
      if (v === 'reg') {
        this.activeRegister();
      } else {
        this.activeLogin();
      }
    });
  }

  activeLogin() {
    this.loginActive = true;
    this.regActive = false;
  }

  activeRegister() {
    this.loginActive = false;
    this.regActive = true;
  }

  get isVaild() {
    return (this.pass === undefined || (this.pass.length >= 6 && this.confirmPass === this.pass)) &&
      (this.email === undefined || this.email.match("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}")) &&
      (this.name === undefined || this.name.length >= 3);
  }

  formSubmit() {
    this.errors = [];
    if (this.regActive) {
      this.auth.register(this.name, this.email, sha1(this.pass), sha1(this.confirmPass)).subscribe(resp => {
        this.sess.refreshAccountInfo();
      }, (err: string[]) => {
        this.errors = err.map(s => {
          return {
            type: 'danger',
            msg: s
          };
        });
      });
    }
  }
}
