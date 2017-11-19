class ShootAction extends Action {
  static get name() {
    return 'shoot';
  }

  constructor(weapon) {
    super(ShootAction.name);
    this._weapon = weapon;
  }

  perform() {
    return new Promise((resolve) => {
      this._weapon.fire();
      resolve();
    });
  }
}
