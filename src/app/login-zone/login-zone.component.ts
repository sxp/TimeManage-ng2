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
import {Alert, trace} from "../po";

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
  private regData = {email: '', pass: '', confirmPass: '', name: '', errors: <Alert[]>[]};
  private loginData = {email: '', pass: '', remember: false, errors: <Alert[]>[]};

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

  get isValid() {
    if (this.regActive) {
      let d = this.regData;
      return d.pass.length >= 6 && d.confirmPass === d.pass && d.email.match("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}") &&
        d.name.length >= 3;
    } else {
      let d = this.loginData;
      return (!d.pass || d.pass.length >= 6) && (!d.email || d.email.match("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}"));
    }
  }

  formSubmit() {
    if (this.regActive) {
      let d = this.regData;
      d.errors = [];
      this.auth.register(d.name, d.email, sha1(d.pass), sha1(d.confirmPass)).subscribe(resp => {
        this.sess.refreshAccountInfo();
      }, (err: string[]) => {
        this.regData.errors = err.map(s => {
          return {
            type: 'danger',
            msg: s
          };
        });
      });
    } else {
      let d = this.loginData;
      d.errors = [];
      this.auth.login(d.email, sha1(d.pass), d.remember).subscribe(resp => {
        this.sess.refreshAccountInfo();
      }, (err: string[]) => {
        this.loginData.errors = err.map(s => {
          return {
            type: 'danger',
            msg: s
          };
        });
      });
    }
  }
}
