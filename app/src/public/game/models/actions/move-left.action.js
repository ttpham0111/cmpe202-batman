class MoveLeftAction extends Action {
  static get name() {
    return 'moveLeft';
  }

  constructor(player) {
    super(MoveLeftAction.name);
    this._player = player;
  }

  perform() {
    return this._player.moveLeft();
  }
}
