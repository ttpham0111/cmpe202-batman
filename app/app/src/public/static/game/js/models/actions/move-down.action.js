class MoveDownAction extends Action {
  static get name() {
    return 'moveDown';
  }

  constructor(hero) {
    super(MoveDownAction.name);
    this._hero = hero;
  }

  perform() {
    const hero = this._hero;
    hero.moveDown();
    hero.body.onMoveComplete.addOnce(this._onComplete.boundDispatch);
  }
}
