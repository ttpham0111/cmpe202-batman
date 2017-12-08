class Character extends Phaser.Sprite {
  constructor(game, x, y, key, group, name, stats) {
    super(game, x, y, key);

    group = group || game.world;
    group.add(this);

    this._name = name || '';
    this.maxHealth = stats.maxHealth;  // Phaser has this built in
    this._strength = stats.strength;
    this._speed = stats.speed;

    this.setHealth(this.maxHealth);
  }

  get isMoving() { return !this.body.velocity.equalsXY(0, 0); }

  get name() { return this._name; }
  get strength () { return this._strength; }
  get speed () { return this._speed; }

  // All directional frames are assumed to be <prefix>_<front|back|side>_<index>.png where index [0, numFrames)
  _setDirectionalFrames(prefix, numFrames, animationSpeed, loop) {
    this._setFrames([
      prefix + '_front',
      prefix + '_back',
      prefix + '_side'
    ], numFrames, animationSpeed, loop);
  }

  // All frames are assumed to be <prefix>_<index>.png where index [0, numFrames)
  _setFrames(prefixes, numFrames, animationSpeed, loop) {
    numFrames = numFrames || 0;
    animationSpeed = animationSpeed || 15;
    loop = loop || false;
    const listOfFrames = Array.isArray(numFrames);

    prefixes.forEach((prefix, i) => {
      const frames = [];
      const _numFrames = (listOfFrames) ? numFrames[i] : numFrames;

      if (_numFrames <= 1) frames.push(prefix + '.png');
      else {
        for (let i = 0; i < _numFrames; i++) {
          frames.push(prefix + '_' + i + '.png');
        }
      }

      this.animations.add(prefix, frames, animationSpeed, loop);
    });
  }

  _reduceStat(stat, value, duration) {
    duration = duration || -1;

    const currentValue = this[stat];
    const delta = ((currentValue - value) > 0) ? value : currentValue;

    this[stat] -= delta;

    if (duration > 0) {
      setTimeout(() => { this._increaseStat(stat, delta); }, duration);
    }
  }

  _increaseStat(stat, value, duration) {
    duration = duration || -1;

    this[stat] += value;

    if (duration > 0) {
      setTimeout(() => { this._reduceStat(stat, value); }, duration);
    }
  }

  reduceStrength(value, duration) {
    this._reduceStat('_strength', value, duration);
  }

  reduceSpeed(value, duration) {
    this._reduceStat('_speed', value, duration);
  }

  increaseStrength(value, duration) {
    this._increaseStat('_strength', value, duration);
  }

  increaseSpeed(value, duration) {
    this._increaseStat('_speed', value, duration);
  }

  moveUp() {
    this.body.velocity.y = -this._speed;
    this.facing = Phaser.ANGLE_UP;
    this.stopX();
  }

  moveDown() {
    this.body.velocity.y = this._speed;
    this.facing = Phaser.ANGLE_DOWN;
    this.stopX();
  }

  moveLeft() {
    this.body.velocity.x = -this._speed;
    this.facing = Phaser.ANGLE_LEFT;
    this.scale.x = Math.abs(this.scale.x);
    this.stopY();

  }

  moveRight() {
    this.body.velocity.x = this._speed;
    this.facing = Phaser.ANGLE_RIGHT;
    this.scale.x = -Math.abs(this.scale.x);
    this.stopY();
  }

  stop() {
    this.stopX();
    this.stopY();
  }

  stopY() {
    this.body.velocity.y = 0;
    this.updateAnimation();
  }

  stopX() {
    this.body.velocity.x = 0;
    this.updateAnimation();
  }

  updateAnimation() {}
}