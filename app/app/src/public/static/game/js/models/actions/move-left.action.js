class MoveLeftAction extends Action {
  static get name() {
    return 'moveLeft';
  }

  constructor(hero) {
    super(MoveLeftAction.name);
    this._hero = hero;
  }

  perform() {
    const hero = this._hero;
    hero.moveLeft();
    hero.body.onMoveComplete.addOnce(this._onComplete.boundDispatch);
  }
}
