class ShootAction extends Action {
  static get name() {
    return 'shoot';
  }

  constructor(weapon) {
    super(ShootAction.name);
    this._weapon = weapon;
  }

  perform() {
    this._weapon.fire();
    this._onComplete.dispatch();
  }
}
