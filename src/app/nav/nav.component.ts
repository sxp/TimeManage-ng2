import {Component, OnInit, Input} from '@angular/core';
import {SessionService} from "../session.service";
import {Account} from "../po";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  account: Account;
  @Input() brandName: string;

  constructor(private session: SessionService, private auth: AuthService) {
  }

  ngOnInit() {
    this.session.accountInfo$.subscribe(v => {
      this.account = v;
    });
    this.session.refreshAccountInfo();
  }

  logout() {
    this.auth.logout().subscribe(v => {
      this.session.refreshAccountInfo();
    });
  }
}
