import {Component, OnInit} from '@angular/core';
import {SessionService} from "../session.service";
import {Account} from "../po";

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loaded = false;
  account: Account;

  constructor(private session: SessionService) {
  }

  ngOnInit() {
    this.session.accountInfo$.subscribe(v => {
      this.loaded = true;
      this.account = v;
    });
    this.session.refreshAccountInfo();
  }

}
