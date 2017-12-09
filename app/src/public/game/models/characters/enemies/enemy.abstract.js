class Enemy extends Character {
  constructor(game, x, y, key, group, name, initialStats) {
    super(game, x, y, key, group, name, initialStats);
  }

  collideWith(player) {
    player.damage(this._strength);
  }
}