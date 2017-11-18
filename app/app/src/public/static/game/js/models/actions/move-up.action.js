class MoveUpAction extends Action {
  static get name() {
    return 'moveUp';
  }

  constructor(hero) {
    super(MoveUpAction.name);
    this._hero = hero;
  }

  perform() {
    const hero = this._hero;
    hero.moveUp();
    hero.body.onMoveComplete.addOnce(this._onComplete.boundDispatch);
  }
}
