import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SessionService {

  constructor() { }

  private loginedSource = new Subject<Boolean>();

  logined$ = this.loginedSource.asObservable();

  login() {
    this.loginedSource.next(true);
  }

  logout() {
    this.loginedSource.next(false);
  }
}
