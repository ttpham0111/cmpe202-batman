class MoveUpAction extends Action {
  static get name() {
    return 'moveUp';
  }

  constructor(player) {
    super(MoveUpAction.name);
    this._player = player;
  }

  perform() {
    return this._player.moveUp();
  }
}
