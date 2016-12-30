import {Component, OnInit} from '@angular/core';
import {ActionService} from "../action.service";
import {Observable} from "rxjs";
import {ActionCategory} from "../action";

@Component({
  selector: 'action-mgr',
  templateUrl: './action-manager.component.html',
  styleUrls: ['./action-manager.component.css']
})
export class ActionManagerComponent implements OnInit {
  private all: Observable<ActionCategory[]>;

  constructor(private as: ActionService) {
  }

  ngOnInit() {
    this.all = this.as.listActionWithCategory();
  }

}
