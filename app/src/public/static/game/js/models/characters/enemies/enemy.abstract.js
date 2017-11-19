class Enemy extends Character {
  constructor(game, x, y, key, group, initialStats) {
    super(game, x, y, key, group, initialStats);
    this.body.immovable = true;
  }
}