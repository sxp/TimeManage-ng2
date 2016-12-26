import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Action} from "./action";

@Injectable()
export class ActionService {
  private getMyActionListUrl = '/json/myActionList';

  constructor(private http: Http) {
  }

  list() {
    return this.http.get(this.getMyActionListUrl)
      .map(resp => <Action[]>resp.json())
  }

}
