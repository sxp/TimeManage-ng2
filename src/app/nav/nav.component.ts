import {Component, OnInit, Input} from '@angular/core';
import {SessionService} from "../session.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  logined = false;
  @Input() brandName: string;

  constructor(private session: SessionService) {
    session.logined$.subscribe(v => {
      this.logined = v.valueOf();
    });
  }

  ngOnInit() {
  }

  brandClick() {
    if (this.logined) {
      this.session.logout();
    } else {
      this.session.login();
    }
  }

}
