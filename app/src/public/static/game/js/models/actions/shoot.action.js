class ShootAction extends Action {
  static get name() {
    return 'shoot';
  }

  constructor(hero, weapon) {
    super(ShootAction.name);
    this._hero = hero;
    this._weapon = weapon;
  }

  perform() {
    return new Promise((resolve) => {
      this._weapon.fireAngle = this._hero.facing;
      this._weapon.fire();
      resolve();
    });
  }
}
