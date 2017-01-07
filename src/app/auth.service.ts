import {Injectable} from '@angular/core';
import {Jsonp, RequestOptions, Headers, Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Account} from "./po";

@Injectable()
export class AuthService {
  private qqUserInfoUrl = '/auth/qq/info';
  private createNewQqUserUrl = '/auth/qq/create';
  private getQqAuthUrl = '/auth/qq/url';
  private logoutUrl = '/logout';

  constructor(private http: Http) {
  }

  get qqAuthUrl() {
    return this.http.get(this.getQqAuthUrl)
      .map(resp => <string>resp.json()['data'])
      .catch(err => {
        console.log(err);
        return Observable.throw(err);
      });
  }

  createNewQqUser(name: string) {
    return this.http.post(this.createNewQqUserUrl, {name})
      .map(resp => resp.json())
      .catch(err => {
        console.log(err);
        return Observable.throw(err);
      })
  }

  qqUserInfo() {
    return this.http.get(this.qqUserInfoUrl)
      .map(resp => <Account>resp.json()['data'])
      .catch(err => {
        console.log(err);
        return Observable.throw(err);
      });
  }

  logout() {
    return this.http.post(this.logoutUrl, {}).map(resp => true);
  }

}
