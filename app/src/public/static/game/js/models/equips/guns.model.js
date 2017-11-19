class Gun extends Equip {
  constructor(game) {
    super(Equip.TYPE_WEAPON, 0, 10, 0);

    const weapon = game.add.weapon(5, Game.SPRITE_BULLET_KEY);
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 2000;
    weapon.fireRate = 500;
    this._weapon = weapon;
  }

  _equipTo(hero) {
    this._weapon.trackSprite(hero, Game.SPRITE_HERO_WIDTH / 2, Game.SPRITE_HERO_HEIGHT / 2);
    this._actions = [new ShootAction(hero, this._weapon)];
  }
}
