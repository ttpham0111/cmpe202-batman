class Chuchu extends Enemy {
  constructor(game, x, y, key, animationKey, group, initialStats) {
    super(game, x, y, key, group, 'Chuchu', initialStats);
    this._animationKey = animationKey;

    this.scale.set((Math.random() * .4) + 1.3);
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.bounce.set(1, 1);
    this.body.immovable = true;

    this._addAnimations();
    this.animations.play(this._animationKey + '_idle');

    this._hurting = false;
  }

  damage(amount) {
    if (this._hurting) return;
    this._hurting = true;
    this.body.immovable = false;

    this.animations.play(this._animationKey + '_hurt').onComplete.addOnce(() => {
      this.stop();
      this.body.immovable = true;
      this.animations.play(this._animationKey + '_idle');
      super.damage(amount);
      this._hurting = false;
    });
  }

  kill() {
    this.animations.play(this._animationKey + '_die').onComplete.addOnce(() => {
      super.kill();
    });
  }

  _addAnimations() {
    this._setFrames([
      this._animationKey + '_idle',
      this._animationKey + '_chase'
    ], [16, 10], undefined, true);

    this._setFrames([
      this._animationKey + '_jump',
      this._animationKey + '_hurt',
      this._animationKey + '_die',
    ], [7, 16, 3], 50);
  }
}

class ChuchuGreen extends Chuchu {
  static get SPRITE_KEY() { return 'sprite-chuchu-green'; }

  constructor(game, x, y, group, initialStats) {
    super(game, x, y, ChuchuGreen.SPRITE_KEY, 'chuchu_green', group, initialStats || {
      maxHealth: 3,
      strength: 1,
      speed: 10
    });
  }
}


class ChuchuBlue extends Chuchu {
  static get SPRITE_KEY() { return 'sprite-chuchu-blue'; }

  constructor(game, x, y, group, initialStats) {
    super(game, x, y, ChuchuBlue.SPRITE_KEY, 'chuchu_blue', group, initialStats || {
      maxHealth: 5,
      strength: 2,
      speed: 50
    });
  }
}