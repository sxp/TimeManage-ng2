import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Action, ActionCategory} from "../po";
import {ActionService} from "../action.service";

@Component({
  selector: '.action-editor',
  templateUrl: './action-editor.component.html',
  styleUrls: ['./action-editor.component.css']
})
export class ActionEditorComponent implements OnInit, OnChanges {
  @Input() private data: Action;
  @Input() private parentBusy: boolean;
  private showRenameForm = false;
  private _name: string;
  private changeOld = false;
  private alerts = [];
  private waiting = false;

  constructor(private as: ActionService) {
  }

  test() {
    console.log('work');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['parentBusy']) {
      this.waiting = changes['parentBusy'].currentValue;
    }
  }

  ngOnInit() {
    this._name = this.data && this.data.name;
  }

  toggleRename() {
    this.showRenameForm = !this.showRenameForm;
    this.clearAlarts();
  }

  save() {
    this.waiting = true;
    this.clearAlarts();
    this.as.saveAction(this.data.id, this._name, this.changeOld).subscribe(v => {
      this.waiting = false;
      this.cancel();
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
  }

  clearAlarts() {
    this.alerts = [];
  }

  deleteAction() {
    this.waiting = true;
    this.clearAlarts();
    this.as.deleteAction(this.data.id).subscribe(v => {
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
