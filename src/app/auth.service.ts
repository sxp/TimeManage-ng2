import {Injectable} from '@angular/core';
import {Jsonp} from '@angular/http';
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService {
  private getQqAuthUrl: string = 'http://test.miguo.in:8000/jsonp/qqAuthUrl';
  private jsonpParams = '?callback=JSONP_CALLBACK';

  constructor(private jsonp: Jsonp) {
  }

  qqAuthUrl() {
    return this.jsonp.get(this.getQqAuthUrl + this.jsonpParams)
      .map(resp => resp.json()['data'])
      .catch(err => {
        console.log(err);
        return Observable.throw(err);
      });
  }

}
