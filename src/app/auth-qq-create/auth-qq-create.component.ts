import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Account} from "../account";

@Component({
  templateUrl: './auth-qq-create.component.html',
  styleUrls: ['./auth-qq-create.component.css']
})
export class AuthQqCreateComponent implements OnInit {
  data = {nick: ''};
  account: Account;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.qqUserInfo().subscribe(act => {
      this.account = act;
      this.data.nick = act.qqNick
    })
  }

  get trace() {
    return JSON.stringify(this.data);
  }

  onSubmit() {
    console.log(this.trace);
    this.auth.createNewQqUser(this.data.nick).subscribe(resp => {
      console.log(resp);
    });
  }

}
