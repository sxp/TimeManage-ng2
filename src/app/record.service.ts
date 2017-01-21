import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {Record, commonRespMap, FullRecord} from "./po";

@Injectable()
export class RecordService {
  private doUrl = '/json/do';
  private currentUrl = '/json/current';
  private historyUrl = '/json/recordHistory';

  constructor(private http: Http) {
  }

  changeCurrent(id: number): Observable<Record> {
    return commonRespMap<Record>(this.http.post(this.doUrl, {id}), d => {
      return d.data;
    });
  }

  get current() {
    return this.http.get(this.currentUrl).map(resp => {
      return <Record[]>resp.json();
    });
  }

  history(num: number) {
    return commonRespMap<FullRecord[]>(this.http.get(this.historyUrl + `/${num}/`), d => {
      return d.data;
    });
  }

}
