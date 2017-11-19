class MoveLeftAction extends Action {
  static get name() {
    return 'moveLeft';
  }

  constructor(hero) {
    super(MoveLeftAction.name);
    this._hero = hero;
  }

  perform() {
    return this._hero.moveLeft();
  }
}
