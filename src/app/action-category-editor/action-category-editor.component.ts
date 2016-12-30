import {Component, OnInit, Input} from '@angular/core';
import {ActionCategory} from "../action";
import {ActionService} from "../action.service";

@Component({
  selector: 'action-category-editor',
  templateUrl: './action-category-editor.component.html',
  styleUrls: ['./action-category-editor.component.css']
})
export class ActionCategoryEditorComponent implements OnInit {
  @Input() private data: ActionCategory;
  private showRenameForm = false;
  private _name: string;
  private alerts = [];

  constructor(private as: ActionService) {
  }

  ngOnInit() {
    this._name = this.data && this.data.name;
  }

  remove() {
    this.as.deleteCategory(this.data.id);
  }

  toggleRename() {
    this.showRenameForm = !this.showRenameForm;
  }

  save() {
    this.clearAlarts();
    this.as.saveCategory(this.data.id, this._name).subscribe(v => {
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

  addAction() {
  }
}
