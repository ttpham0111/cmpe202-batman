class Rope extends Enemy {
  static get SPRITE_KEY() { return 'sprite-rope'; }

  constructor(game, x, y, group, initialStats) {
    super(game, x, y, Rope.SPRITE_KEY, group, 'Rope', initialStats || {
      maxHealth: 2,
      strength: 2,
      speed: 10
    });

    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.immovable = true;
    this.body.bounce.set(1, 1);

    this._addAnimations();
  }

  _addAnimations() {
  }
}
