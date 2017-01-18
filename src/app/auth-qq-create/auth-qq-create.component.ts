import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Account} from "../po";
import {Router} from "@angular/router";

@Component({
  templateUrl: './auth-qq-create.component.html',
  styleUrls: ['./auth-qq-create.component.css']
})
export class AuthQqCreateComponent implements OnInit {
  data = {nick: ''};
  account: Account;

  constructor(private auth: AuthService, private route: Router) {
  }

  ngOnInit() {
    this.auth.qqUserInfo().subscribe(act => {
      this.account = act;
      this.data.nick = act.qqNick
    }, _ => {
      this.route.navigate(['/']);
    })
  }

  onSubmit() {
    this.auth.createNewQqUser(this.data.nick).subscribe(_ => {
      this.route.navigate(['/']);
    }, err => {
      console.log(err);
    });
  }

}
