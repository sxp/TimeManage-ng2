import {Component, OnInit, Input} from '@angular/core';
import {Action, ActionCategory} from "../action";
import {ActionService} from "../action.service";

@Component({
  selector: '.action-editor',
  templateUrl: './action-editor.component.html',
  styleUrls: ['./action-editor.component.css']
})
export class ActionEditorComponent implements OnInit {
  @Input() private data: Action;
  private showRenameForm = false;
  private _name: string;
  private changeOld = false;
  private alerts = [];

  constructor(private as: ActionService) {
  }

  ngOnInit() {
    this._name = this.data && this.data.name;
  }

  toggleRename() {
    this.showRenameForm = !this.showRenameForm;
  }

  save() {
    this.clearAlarts();
    this.as.saveAction(this.data.id, this._name, this.changeOld).subscribe(v => {
      this.cancel();
    }, err => {
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
}
