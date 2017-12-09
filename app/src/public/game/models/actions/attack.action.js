class AttackAction extends Action {
  static get name() {
    return 'attack';
  }

  constructor(weapon) {
    super(AttackAction.name);
    this._weapon = weapon;
  }

  perform() {
    this._weapon.attack();
  }
}
