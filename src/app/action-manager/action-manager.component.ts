import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionService} from "../action.service";
import {Observable} from "rxjs";
import {ActionCategory} from "../po";
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'action-mgr',
  templateUrl: './action-manager.component.html',
  styleUrls: ['./action-manager.component.css']
})
export class ActionManagerComponent implements OnInit {
  private all: Observable<ActionCategory[]>;
  private alerts = [];
  private waiting = false;
  private addCategoryName: string;
  @ViewChild('addCategoryConfirm') private addCategoryDialog: ModalDirective;

  constructor(private as: ActionService) {
  }

  ngOnInit() {
    this.all = this.as.listActionWithCategory();
  }

  clearAlarts() {
    this.alerts = [];
  }

  showAddCategory() {
    this.addCategoryName = '';
    this.addCategoryDialog.show();
  }

  hideAddCategory() {
    this.clearAlarts();
    this.addCategoryDialog.hide();
  }

  addCategory() {
    this.waiting = true;
    this.clearAlarts();
    this.as.addCategory(this.addCategoryName).subscribe(v => {
      this.hideAddCategory();
      this.waiting = false;
    }, err => {
      this.waiting = false;
      this.alerts.push({
        type: 'danger',
        msg: err
      });
    });
  }

}
