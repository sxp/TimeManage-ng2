import {Component, OnInit} from '@angular/core';
import {Observable, ConnectableObservable, Subscription} from "rxjs";
import {ActionService} from "../action.service";
import {Action, Record} from "../po";
import {RecordService} from "../record.service";

@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private actionList: Action[];
  private loading = true;
  private posting: boolean|number = false;
  private current = '';
  private due = '';
  private dueSubscription: Subscription;
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
      let res = this.actionList.find(v => v.id === r.id);
      if (res) {
        this.current = res.name;
        this.resetDueTimer(r.startAt);
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
      this.due = this.dueString(time);
    });
  }

  private dueString(time: number) {
    let now = new Date();
    let diff = Math.round(now.getTime() / 1000) - time;
    let d = Math.floor(diff / (60 * 60 * 24));
    diff = (diff % (60 * 60 * 24));
    let h = Math.floor(diff / (60 * 60));
    diff = (diff % (60 * 60));
    let m = Math.floor(diff / 60);
    let s = diff % 60;
    return (d ? d + '天' : '') + (h ? h + '时' : '') + (m ? m + '分' : '') + (s ? s + '秒' : '');
  }

  private reinit() {
    this.actionList = [];
    this.loading = true;
    this.current = '';
    this.due = '';
    this.dueSubscription && this.dueSubscription.unsubscribe();
    this.dueSubscription = null;
    this.error = '';
    this.postError = '';
  }

  private loadData() {
    Observable.combineLatest(this.as.listAction(), this.rs.current).subscribe(this.processData.bind(this), err => {
      this.loading = false;
      this.error = err;
    });
  }

  private processData(p: [Action[], Record[]]) {
    this.loading = false;
    if (p[1].length > 0) {
      let r = p[1][0];
      let res = p[0].find(v => v.id === r.id);
      if (res) {
        this.current = res.name;
        this.resetDueTimer(r.startAt);
      }
    }
    this.actionList = p[0];
  }

}
