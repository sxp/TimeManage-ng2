import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {Account} from "./account";

@Injectable()
export class SessionService {
  private accountInfoUrl = 'http://test.miguo.in:8000/json/accountInfo';

  constructor(private http: Http) {
  }

  private loginedSource = new Subject<Boolean>();
  private accountInfoSource = new Subject<Account>();

  logined$ = this.loginedSource.asObservable();
  accountInfo$ = this.accountInfoSource.asObservable();

  refreshAccountInfo() {
    this.http.get(this.accountInfoUrl)
      .subscribe(resp => {
          let j = resp.json();
          if (j['res'] === 'guest') {
            this.loginedSource.next(false);
            this.accountInfoSource.next();
          } else if (j['res'] === 'logon') {
            this.loginedSource.next(true);
            this.accountInfoSource.next(<Account>j['account']);
          }
        }, err => {
          console.log(err);
        }
      );
  }
}
