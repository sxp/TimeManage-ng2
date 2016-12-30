import {Component, OnInit} from '@angular/core';
import {Observable, ConnectableObservable} from "rxjs";
import {ActionService} from "../action.service";
import {Action} from "../action";

@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private actionList: ConnectableObservable<Action[]>;
  private current = '加载中';

  constructor(private as: ActionService) {
  }

  ngOnInit() {
    this.actionList = this.as.listAction().publish();
    this.actionList.subscribe(l => {
      this.current = l[0].name;
    });
    this.actionList.connect();
  }

  changeCurrent(name: string) {
    this.current = name;
  }

}
