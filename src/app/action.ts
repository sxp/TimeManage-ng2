export class Action {
  constructor(public name: string, public id: number, public recordNum?: number) {
  }
}
export class ActionCategory {
  constructor(public name: string, public id: number, public children: Action[]) {
  }
}
