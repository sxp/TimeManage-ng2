import {
  Component, OnInit, trigger,
  state, style, animate, transition
} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../auth.service";
import {ActivatedRoute} from "@angular/router";

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
  qqAuthUrl: Observable<string>;
  loginActive = true;
  regActive = false;

  constructor(private auth: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.qqAuthUrl = this.auth.qqAuthUrl();
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

}
