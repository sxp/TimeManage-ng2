import {Injectable} from '@angular/core';
import {Jsonp, RequestOptions, Headers, Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Account, commonRespMap} from "./po";

@Injectable()
export class AuthService {
  private qqUserInfoUrl = '/auth/qq/info';
  private createNewQqUserUrl = '/auth/qq/create';
  private getQqAuthUrl = '/auth/qq/url';
  private logoutUrl = '/logout';
  private registerUrl = '/register';
  private loginUrl = '/login';

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
    return commonRespMap(this.http.post(this.createNewQqUserUrl, {name}));
  }

  qqUserInfo() {
    return commonRespMap(this.http.get(this.qqUserInfoUrl), d => d.data, d => d.res);
  }

  logout() {
    return this.http.post(this.logoutUrl, {}).map(resp => true);
  }

  register(name: string, email: string, password: string, password_confirmation: string) {
    return commonRespMap(this.http.post(this.registerUrl, {name, email, password, password_confirmation}));
  }

  login(email: string, password: string, remember: boolean) {
    return commonRespMap(this.http.post(this.loginUrl, {email, password, remember}));
  }

}
