class Gun extends Equip {
  constructor(game) {
    super(Equip.TYPE_WEAPON, 0, 10, 0);

    const weapon = game.add.weapon(5, Game.SPRITE_BULLET_KEY);
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 1000;
    weapon.fireRate = 1;
    this._weapon = weapon;
  }

  _equip(hero) {
    this._weapon.trackSprite(hero, 0, 0, true);
    this._actions.push(new ShootAction(this._weapon));
    hero.equip(this);
  }
}
