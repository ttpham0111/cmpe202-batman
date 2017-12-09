class FireAction extends Action {
  static get name() {
    return 'fire';
  }

  constructor(player, weapon) {
    super(FireAction.name);
    this._player = player;
    this._weapon = weapon;
  }

  perform() {
    this._weapon.fireAngle = this._player.facing;
    this._weapon.fire();
  }
}
