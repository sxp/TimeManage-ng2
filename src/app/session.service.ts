import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {Account} from "./po";

@Injectable()
export class SessionService {
  private accountInfoUrl = '/json/accountInfo';
  private account: Account;

  constructor(private http: Http) {
  }

  private loginedSource = new Subject<Boolean>();
  private accountInfoSource = new Subject<Account>();
  private _logined = this.loginedSource.asObservable();
  private _accountInfo = this.accountInfoSource.asObservable();

  get logined$() {
    if (this.account) {
      return Observable.merge(Observable.of(true), this._logined);
    } else {
      return Observable.merge(Observable.of(false), this._logined);
    }
  }

  get accountInfo$() {
    if (this.account) {
      return Observable.merge(Observable.of(this.account), this._accountInfo);
    } else {
      return Observable.merge(Observable.of(null), this._accountInfo);
    }
  }

  refreshAccountInfo() {
    this.http.get(this.accountInfoUrl) .subscribe(resp => {
        let j = resp.json();
        if (j['res'] === 'guest') {
          this.account = null;
          this.loginedSource.next(false);
          this.accountInfoSource.next();
        } else if (j['res'] === 'logon') {
          let a = <Account>j['account'];
          this.account = a;
          this.loginedSource.next(true);
          this.accountInfoSource.next(a);
        }
      }, err => {
        console.log(err);
      }
    );
  }
}
