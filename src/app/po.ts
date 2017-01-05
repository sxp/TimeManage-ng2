export class Action {
  constructor(public name: string, public id: number, public recordNum?: number) {
  }
}
export class ActionCategory {
  constructor(public name: string, public id: number, public children: Action[]) {
  }
}
export class Account {
  constructor(public name: string, public avatarUrl: string, public qqNick: string) {
  }
}
