class MoveRightAction extends Action {
  static get name() {
    return 'moveRight';
  }

  constructor(hero) {
    super(MoveRightAction.name);
    this._hero = hero;
  }

  perform() {
    const hero = this._hero;
    hero.moveRight();
    hero.body.onMoveComplete.addOnce(this._onComplete.boundDispatch);
  }
}
