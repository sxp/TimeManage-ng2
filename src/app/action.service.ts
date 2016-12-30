import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Action, ActionCategory} from "./action";

@Injectable()
export class ActionService {
  private getMyActionListUrl = '/json/myActionList';
  private data = [
    new ActionCategory('test', 10, [new Action('test1', 1, 10), new Action('test2', 2), new Action('test3', 1, 10)]),
    new ActionCategory('test', 20, [new Action('test1', 22)]),
    new ActionCategory('test', 30, [new Action('test1', 32, 10)])
  ];

  constructor(private http: Http) {
  }

  listAction() {
    return this.http.get(this.getMyActionListUrl)
      .map(resp => <Action[]>resp.json())
  }

  listActionWithCategory() {
    return Observable.of(this.data);
  }

  deleteCategory(id: number) {
    let idx = this.data.findIndex(v => v.id === id);
    if (idx !== -1) {
      this.data.splice(idx, 1);
    }
  }

  saveCategory(id: number, name: string) {
    let idx = this.data.findIndex(v => v.id === id);
    if (idx !== -1) {
      this.data[idx].name = name;
      return Observable.of(null);
    } else {
      return Observable.throw(`Can't find category: ${id}`);
    }
  }

  saveAction(id: number, name: string, changeOld: boolean) {
    let ok = false;
    this.data.forEach((v: ActionCategory) => {
      let idx = v.children.findIndex(i => i.id === id);
      if (idx !== -1) {
        v.children[idx].name = name;
        ok = true;
      }
    });
    if (ok) {
      return Observable.of(null);
    } else {
      return Observable.throw(`Can't find action: ${id}`);
    }
  }

  addAction(id: number, name: string) {
    let idx = this.data.findIndex(v => v.id === id);
    if (idx !== -1) {
      this.data[idx].children.push(new Action(name, Math.ceil(Math.random())));
      return Observable.of(null);
    } else {
      return Observable.throw(`Can't find category: ${id}`);
    }
  }

}
