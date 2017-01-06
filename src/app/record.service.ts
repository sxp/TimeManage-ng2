import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {Record} from "./po";

@Injectable()
export class RecordService {
  private doUrl = '/json/do';
  private currentUrl = '/json/current';

  constructor(private http: Http) {
  }

  private commonRespMap<T>(resp: Observable<Response>, func?: (any) => T) {
    return resp.switchMap<Response, boolean|T>(resp => {
      let d = resp.json();
      if (d.res === 0) {
        if (func === undefined) {
          return Observable.of(true);
        } else {
          return Observable.of(func(d));
        }
      } else {
        return Observable.throw(d.msg);
      }
    });
  }

  changeCurrent(id: number): Observable<Record> {
    return this.commonRespMap<Record>(this.http.post(this.doUrl, {id}), d => {
      return d.data;
    });
  }

  get current() {
    return this.http.get(this.currentUrl).map(resp => {
      return <Record[]>resp.json();
    });
  }

}
