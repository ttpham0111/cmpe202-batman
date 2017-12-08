class MoveRightAction extends Action {
  static get name() {
    return 'moveRight';
  }

  constructor(player) {
    super(MoveRightAction.name);
    this._player = player;
  }

  perform() {
    return this._player.moveRight();
  }
}
