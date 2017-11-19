class Goon extends Enemy {
  constructor(game, x, y, group, initialStats) {
    initialStats = initialStats || {
      name: 'Goon',
      maxHealth: 10,
      strength: 2,
      speed: 100
    };
    super(game, x, y, Game.SPRITE_HERO_KEY, group, initialStats);

    const numFrames = 9;
    this._setDirectionFrames(0, numFrames * 3, numFrames * 2, numFrames);
    this._setDirectionAnimation(
      Array.from(new Array(numFrames), (x, i) => i),
      Array.from(new Array(numFrames), (x, i) => i + (numFrames * 3)),
      Array.from(new Array(numFrames), (x, i) => i + (numFrames * 2)),
      Array.from(new Array(numFrames), (x, i) => i + numFrames)
    );
  }
}
