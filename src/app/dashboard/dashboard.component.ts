import {Component, OnInit} from '@angular/core';
import {Observable, ConnectableObservable, Subscription} from "rxjs";
import {ActionService} from "../action.service";
import {Action, Record, trace, FullRecord} from "../po";
import {RecordService} from "../record.service";

@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private actionList: Action[];
  private historyList: FullRecord[];
  private loading = true;
  private posting: boolean|number = false;
  private current = '';
  private currentAction = 0;
  private currentInHistory: FullRecord | null;
  private due = '';
  private dueSubscription: Subscription | null;
  private error = '';
  private postError = '';

  constructor(private as: ActionService, private rs: RecordService) {
  }

  ngOnInit() {
    this.loadData();
  }

  changeCurrent(id: number) {
    this.posting = id;
    this.postError = '';
    this.rs.changeCurrent(id).subscribe(r => {
      this.posting = false;
      let res = this.actionList.find(v => v.id === r.actionId);
      if (res) {
        this.current = res.name;
        this.currentAction = r.id || 0;
        this.resetDueTimer(r.startAt);
        this.rs.history(1).subscribe((rl: FullRecord[]) => {
          if (rl.length > 0) {
            let r = rl[0];
            let idx = this.historyList.findIndex(v => v.id === r.id);
            if (idx < 0) {
              this.historyList.unshift(this.processHistoryRecord(r));
              this.historyList[1].due = this.dueString(r.startAt - this.historyList[1].startAt, 2);
            } else if (idx === 0) {
              this.historyList[0].name = r.name;
            } else {
              this.historyList = this.historyList.slice(idx)
              this.currentInHistory = this.historyList[0];
              this.currentInHistory.due = this.dueStringToNow(this.currentInHistory.startAt);
            }
          }
        });
      } else {
        this.postError = '出错了，请刷新试试';
      }
    }, err => {
      this.posting = false;
      this.postError = '出错了：' + err;
    });
  }

  refresh() {
    if (this.posting) return;
    this.reinit();
    this.loadData();
  }

  private resetDueTimer(time: number) {
    this.dueSubscription && this.dueSubscription.unsubscribe();
    this.dueSubscription = Observable.timer(0, 1000).subscribe(v => {
      this.due = this.dueStringToNow(time, Infinity);
      if (this.currentInHistory) {
        this.currentInHistory.due = this.dueStringToNow(time);
      }
    });
  }

  private dueStringToNow(time: number, field?: number) {
    let now = new Date();
    let diff = Math.max(Math.round(now.getTime() / 1000) - time, 0);
    return this.dueString(diff, field);
  }

  private dueString(sec: number, field: number = 3) {
    let d = Math.floor(sec / (60 * 60 * 24));
    sec = (sec % (60 * 60 * 24));
    let h = Math.floor(sec / (60 * 60));
    sec = (sec % (60 * 60));
    let m = Math.floor(sec / 60);
    let s = sec % 60;

    function f(v: number, unit: string) {
      if (v > 0 && field > 0) {
        field--;
        return v + unit;
      }
      return '';
    }

    let str = f(d, '天') + f(h, '时') + f(m, '分') + f(s, '秒');
    if (str.length < 1) str = '0秒';
    return str;
  }

  private reinit() {
    this.actionList = [];
    this.loading = true;
    this.current = '';
    this.currentAction = 0;
    this.currentInHistory = null;
    this.due = '';
    this.dueSubscription && this.dueSubscription.unsubscribe();
    this.dueSubscription = null;
    this.error = '';
    this.postError = '';
  }

  private loadData() {
    Observable.combineLatest(this.as.listAction(), this.rs.current, this.rs.history(10)).subscribe(this.processData.bind(this), err => {
      this.loading = false;
      this.error = err;
    });
  }

  private processData([al, c, hl]: [Action[], Record[], FullRecord[]]) {
    this.loading = false;
    if (c.length > 0) {
      let r = c[0];
      let res = al.find(v => v.id === r.actionId);
      if (res) {
        this.current = res.name;
        this.currentAction = r.id || 0;
        this.resetDueTimer(r.startAt);
      }
    }
    this.actionList = al;
    this.historyList = hl.map(r => {
      return this.processHistoryRecord(r);
    });
  }

  private processHistoryRecord(r: FullRecord) {
    let now = new Date();
    let ret = r;
    let d = new Date(r.startAt * 1000);
    if (d.toLocaleDateString() === now.toLocaleDateString()) {
      ret.begin = d.toLocaleTimeString();
    } else {
      ret.begin = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
    }
    if (ret.due !== undefined) {
      ret.due = this.dueString(+ret.due, 2);
    }
    if (ret.id === this.currentAction) {
      ret.due = this.dueStringToNow(ret.startAt);
      this.currentInHistory = ret;
    }
    return ret;
  }

  private trackHistory(idx: number, r: FullRecord) {
    return r.id + r.name;
  }

}
