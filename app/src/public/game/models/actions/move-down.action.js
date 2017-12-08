class MoveDownAction extends Action {
  static get name() {
    return 'moveDown';
  }

  constructor(player) {
    super(MoveDownAction.name);
    this._player = player;
  }

  perform() {
    return this._player.moveDown();
  }
}
