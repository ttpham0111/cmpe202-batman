class MoveDownAction extends Action {
  static get name() {
    return 'moveDown';
  }

  constructor(hero) {
    super(MoveDownAction.name);
    this._hero = hero;
  }

  perform() {
    return this._hero.moveDown();
  }
}
