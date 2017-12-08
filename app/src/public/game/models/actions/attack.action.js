class AttackAction extends Action {
  static get name() {
    return 'attack';
  }

  constructor(player, weapon) {
    super(AttackAction.name);
    this._player = player;
    this._weapon = weapon;
  }

  perform() {
    this._weapon.fireAngle = this._player.facing;
    this._weapon.fire();
  }
}
