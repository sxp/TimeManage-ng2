import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {isUndefined} from "util";
export class Action {
  constructor(public name: string, public id: number, public recordNum?: number) {
  }
}
export class ActionCategory {
  constructor(public name: string, public id: number, public children: Action[]) {
  }
}
export class Account {
  constructor(public name: string, public avatarUrl: string, public qqNick: string) {
  }
}
export class Record {
  constructor(public id: number, public startAt: number) {
  }
}
export interface Alert {
  type: string;
  msg: any;
}
export function commonRespMap<T>(resp: Observable<Response>, succFunc?: (_: any) => T, errorFunc?: (_: any) => any) {
  return resp.switchMap<Response, boolean|T>(resp => {
    let d = resp.json();
    if (d.res === 0) {
      if (succFunc === undefined) {
        return Observable.of(true);
      } else {
        return Observable.of(succFunc(d));
      }
    } else {
      if (errorFunc === undefined) {
        return Observable.throw(d.msg);
      } else {
        return Observable.throw(errorFunc(d));
      }
    }
  });
}
export function trace<T>(o: any, ret?: T): T|undefined {
  console.log(JSON.stringify(o));
  return ret;
}
