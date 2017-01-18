import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {ActionCategory, Alert} from "../po";
import {ActionService} from "../action.service";
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'action-category-editor',
  templateUrl: './action-category-editor.component.html',
  styleUrls: ['./action-category-editor.component.css']
})
export class ActionCategoryEditorComponent implements OnInit {
  @Input() private data: ActionCategory;
  private showRenameForm = false;
  private _name: string;
  private alerts: Alert[] = [];
  private waiting = false;
  private addActionName: string;
  @ViewChild('addActionConfirm') private addActionDialog: ModalDirective;

  constructor(private as: ActionService) {
  }

  ngOnInit() {
    this._name = this.data && this.data.name;
  }

  remove() {
    this.waiting = true;
    this.clearAlarts();
    this.as.deleteCategory(this.data.id).subscribe(v => {
      this.waiting = false;
    }, err => {
      this.waiting = false;
      this.alerts.push({
        type: 'danger',
        msg: err
      });
    });
  }

  toggleRename() {
    this.showRenameForm = !this.showRenameForm;
  }

  save() {
    this.waiting = true;
    this.clearAlarts();
    this.as.saveCategory(this.data.id, this._name).subscribe(v => {
      this.cancel();
      this.waiting = false;
    }, err => {
      this.waiting = false;
      this.alerts.push({
        type: 'danger',
        msg: err
      });
    });
  }

  get nameChanged() {
    return this._name !== this.data.name;
  }

  cancel() {
    this.toggleRename();
    this._name = this.data.name;
    this.clearAlarts();
  }

  clearAlarts() {
    this.alerts = [];
  }

  showAddAction() {
    this.addActionName = '';
    this.addActionDialog.show();
  }

  hideAddAction() {
    this.clearAlarts();
    this.addActionDialog.hide();
  }

  addAction() {
    this.waiting = true;
    this.clearAlarts();
    this.as.addAction(this.data.id, this.addActionName).subscribe(v => {
      this.hideAddAction();
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
