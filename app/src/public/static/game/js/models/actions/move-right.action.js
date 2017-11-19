class MoveRightAction extends Action {
  static get name() {
    return 'moveRight';
  }

  constructor(hero) {
    super(MoveRightAction.name);
    this._hero = hero;
  }

  perform() {
    return this._hero.moveRight();
  }
}
