import {Injectable} from '@angular/core';
import {Jsonp, RequestOptions, Headers, Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Account} from "./account";

@Injectable()
export class AuthService {
  private qqUserInfoUrl = 'http://test.miguo.in:8000/auth/qqUserInfo';
  private createNewQqUserUrl = 'http://test.miguo.in:8000/json/newQqUser';
  private getQqAuthUrl = 'http://test.miguo.in:8000/json/qqAuthUrl';
  private logoutUrl = 'http://test.miguo.in:8000/logout';

  constructor(private http: Http) {
  }

  qqAuthUrl() {
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
