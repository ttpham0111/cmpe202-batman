class MoveUpAction extends Action {
  static get name() {
    return 'moveUp';
  }

  constructor(hero) {
    super(MoveUpAction.name);
    this._hero = hero;
  }

  perform() {
    return this._hero.moveUp();
  }
}
