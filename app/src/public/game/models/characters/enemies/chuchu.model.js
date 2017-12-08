class Chuchu extends Enemy {
  constructor(game, x, y, key, animationKey, group, initialStats) {
    super(game, x, y, key, group, 'Chuchu', initialStats);
    this._animationKey = animationKey;

    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    this._addAnimations();
    this.animations.play(this._animationKey + '_idle');
  }

  _addAnimations() {
    this._setFrames([
      this._animationKey + '_idle',
      this._animationKey + '_chase'
    ], [16, 11], undefined, true);

    this._setFrames([
      this._animationKey + '_jump',
      this._animationKey + '_hurt',
      this._animationKey + '_die',
    ], [7, 16, 3]);
  }
}

class ChuchuGreen extends Chuchu {
  static get SPRITE_KEY() { return 'sprite-chuchu-green'; }

  constructor(game, x, y, group, initialStats) {
    super(game, x, y, ChuchuGreen.SPRITE_KEY, 'chuchu_green', group, initialStats || {
      maxHealth: 2,
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
      strength: 5,
      speed: 50
    });
  }
}