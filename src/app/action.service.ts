import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Action, ActionCategory} from "./action";

@Injectable()
export class ActionService {
  private actionListUrl = '/json/myActionList';
  private categoryListUrl = '/json/myCategoryList';
  private addCategoryUrl = '/json/addCategory';
  private saveCategoryUrl = '/json/saveCategory';
  private deleteCategoryUrl = '/json/deleteCategory';
  private addActionUrl = '/json/addAction';
  private saveActionUrl = '/json/saveAction';
  private deleteActionUrl = '/json/deleteAction';

  private myCategory: ActionCategory[] = [];
  private myAction: Action[] = [];

  constructor(private http: Http) {
  }

  listAction() {
    return this.http.get(this.actionListUrl).map(resp => {
      let d = <Action[]>resp.json();
      this.myAction = d;
      return this.myAction;
    });
  }

  listActionWithCategory() {
    return this.http.get(this.categoryListUrl).map(resp => {
      let d = <ActionCategory[]>resp.json();
      this.myCategory = d;
      return this.myCategory;
    });
  }

  private commonRespMap(resp: Observable<Response>, func?: (any) => any) {
    return resp.switchMap(resp => {
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

  deleteCategory(id: number) {
    return this.commonRespMap(this.http.post(this.deleteCategoryUrl, {id})).do(ignore => {
      let idx = this.myCategory.findIndex(v => v.id === id);
      if (idx !== -1) {
        this.myCategory.splice(idx, 1);
      }
    });
  }

  saveCategory(id: number, name: string) {
    return this.commonRespMap(this.http.post(this.saveCategoryUrl, {id, name})).do(ignore => {
      let idx = this.myCategory.findIndex(v => v.id === id);
      if (idx !== -1) {
        this.myCategory[idx].name = name;
      }
    });
  }

  saveAction(id: number, name: string, changeOld: boolean) {
    return this.commonRespMap(this.http.post(this.saveActionUrl, {id, name, changeOld}), d => {
      this.myCategory.forEach((v: ActionCategory) => {
        let idx = v.children.findIndex(i => i.id === id);
        if (idx !== -1) {
          if (v.children[idx].id !== d.id) {
            v.children[idx].id = d.id;
          }
          v.children[idx].name = name;
        }
      });
    });
  }

  addAction(cid: number, name: string) {
    return this.commonRespMap(this.http.post(this.addActionUrl, {cid, name}), d => {
      let a = <Action>d.data;
      let idx = this.myCategory.findIndex(v => v.id === cid);
      if (idx !== -1) {
        this.myCategory[idx].children.push(a);
      }
      return a;
    });
  }

  addCategory(name: string) {
    return this.commonRespMap(this.http.post(this.addCategoryUrl, {name}), d => {
      let c = <ActionCategory>d.data;
      this.myCategory.push(c);
      return c;
    });
  }

  deleteAction(id: number) {
    return this.commonRespMap(this.http.post(this.deleteActionUrl, {id})).do(ignore => {
      this.myCategory.forEach((v: ActionCategory) => {
        let idx = v.children.findIndex(i => i.id === id);
        if (idx !== -1) {
          v.children.splice(idx, 1);
        }
      });
    });
  }
}

@Injectable()
export class LocalActionService {
  private data = [
    new ActionCategory('test', 10, [new Action('test1', 1, 10), new Action('test2', 2), new Action('test3', 1, 10)]),
    new ActionCategory('test', 20, [new Action('test1', 22)]),
    new ActionCategory('test', 30, [new Action('test1', 32, 10)])
  ];

  constructor() {
  }

  listAction() {
    let ret: Action[] = [];
    this.data.forEach(c => {
      ret = ret.concat(c.children);
    });
    return Observable.of(ret).delay(1000);
  }

  listActionWithCategory() {
    return Observable.of(this.data);
  }

  deleteCategory(id: number) {
    let idx = this.data.findIndex(v => v.id === id);
    if (idx !== -1) {
      return Observable.of(true).delay(2000).do(v => {
        this.data.splice(idx, 1);
      });
    } else {
      return Observable.throw(`Can't find category: ${id}`);
    }
  }

  saveCategory(id: number, name: string) {
    let idx = this.data.findIndex(v => v.id === id);
    if (idx !== -1) {
      this.data[idx].name = name;
      return Observable.of(null).delay(3000);
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
      return Observable.of(null).delay(3000);
    } else {
      return Observable.throw(`Can't find action: ${id}`);
    }
  }

  addAction(id: number, name: string) {
    let idx = this.data.findIndex(v => v.id === id);
    if (idx !== -1) {
      this.data[idx].children.push(new Action(name, Math.ceil(Math.random() * 9999999999)));
      return Observable.of(null).delay(10000);
    } else {
      return Observable.throw(`Can't find category: ${id}`);
    }
  }

  addCategory(name: string) {
    this.data.push(new ActionCategory(name, Math.ceil(Math.random() * 9999999999), []));
    return Observable.of(null).delay(10000);
  }

  deleteAction(id: number) {
    let ok = false;
    this.data.forEach((v: ActionCategory) => {
      let idx = v.children.findIndex(i => i.id === id);
      if (idx !== -1) {
        v.children.splice(idx, 1);
        ok = true;
      }
    });
    if (ok) {
      return Observable.of(null).delay(5000);
    } else {
      return Observable.throw(`Can't find action: ${id}`);
    }
  }
}
