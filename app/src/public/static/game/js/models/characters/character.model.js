const ANIMATION_UP = 'up';
const ANIMATION_RIGHT = 'right';
const ANIMATION_DOWN = 'down';
const ANIMATION_LEFT = 'left';


class Character extends Phaser.Sprite {
  constructor(game, x, y, key, group, initialStats) {
    super(game, x, y, key);
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    group = group || game.world;
    group.add(this);

    this._name = initialStats.name;
    this._maxHealth = initialStats.maxHealth;
    this._strength = initialStats.strength;
    this._speed = initialStats.speed;

    this.setHealth(this._maxHealth);  // Phaser has an internal health/maxHealth (default 1/100);
  }

  _setDirectionFrames(up, right, down, left) {
    this._frameDirections = {
      up: up,
      right: right,
      down: down,
      left: left
    }
  }

  _setDirectionAnimation(up, right, down, left, animationSpeed) {
    animationSpeed = animationSpeed || 15;
    this.animations.add(ANIMATION_UP, up, animationSpeed, true);
    this.animations.add(ANIMATION_RIGHT, right, animationSpeed, true);
    this.animations.add(ANIMATION_DOWN, down, animationSpeed, true);
    this.animations.add(ANIMATION_LEFT, left, animationSpeed, true);
  }

  _reduceStat(stat, value, duration) {
    duration = duration || -1;
    const currentValue = this[stat];
    this[stat] = Math.max(currentValue - value, 0);

    // TODO: Handle race condition
    if (duration > 0) {
      setTimeout(() => { this[stat] = currentValue; }, duration);
    }
  }

  _increaseStat(stat, value, duration) {
    duration = duration || -1;
    const currentValue = this[stat];
    this[stat] += value;

    // TODO: Handle race condition
    if (duration > 0) {
      setTimeout(() => { this[stat] = currentValue; }, duration);
    }
  }

  get name() {
    return this._name;
  }

  get maxHealth() {
    return this._maxHealth;
  }

  get currentHealth() {
    return this._currentHealth;
  }

  get strength() {
    return this._strength;
  }

  get speed() {
    return this._speed;
  }

  reduceMaxHealth(value, duration) {
    this._reduceStat('_maxHealth', value, duration);
  }

  reduceCurrentHealth(value, duration) {
    this._reduceStat('_currentHealth', value, duration);
  }

  reduceStrength(value, duration) {
    this._reduceStat('_strength', value, duration);
  }

  reduceSpeed(value, duration) {
    this._reduceStat('_speed', value, duration);
  }

  increaseMaxHealth(value, duration) {
    this._increaseStat('_maxHealth', value, duration);
  }

  increaseCurrentHealth(value, duration) {
    this._increaseStat('_currentHealth', value, duration);
  }

  increaseStrength(value, duration) {
    this._increaseStat('_strength', value, duration);
  }

  increaseSpeed(value, duration) {
    this._increaseStat('_speed', value, duration);
  }

  faceUp() {
    this.facing = Phaser.ANGLE_UP;
    this.stop();
  }

  faceRight() {
    this.facing = Phaser.ANGLE_RIGHT;
    this.stop();
  }

  faceDown() {
    this.facing = Phaser.ANGLE_DOWN;
    this.stop();
  }

  faceLeft() {
    this.facing = Phaser.ANGLE_LEFT;
    this.stop();
  }

  moveUp() {
    return new Promise((resolve) => {
      this.body.moveTo(Game.SPEED / this._speed, Game.TILE_HEIGHT, Phaser.ANGLE_UP);
      this.animations.play(ANIMATION_UP);
      this.facing = Phaser.ANGLE_UP;
      this.body.onMoveComplete.addOnce(resolve);
    });
  }

  moveRight() {
    return new Promise((resolve) => {
      this.body.moveTo(Game.SPEED / this._speed, Game.TILE_WIDTH, Phaser.ANGLE_RIGHT);
      this.animations.play(ANIMATION_RIGHT);
      this.facing = Phaser.ANGLE_RIGHT;
      this.body.onMoveComplete.addOnce(resolve);
    });
  }

  moveDown() {
    return new Promise((resolve) => {
      this.body.moveTo(Game.SPEED / this._speed, Game.TILE_HEIGHT, Phaser.ANGLE_DOWN);
      this.animations.play(ANIMATION_DOWN);
      this.facing = Phaser.ANGLE_DOWN;
      this.body.onMoveComplete.addOnce(resolve);
    });
  }

  moveLeft() {
    return new Promise((resolve) => {
      this.body.moveTo(Game.SPEED / this._speed, Game.TILE_WIDTH, Phaser.ANGLE_LEFT);
      this.animations.play(ANIMATION_LEFT);
      this.facing = Phaser.ANGLE_LEFT;
      this.body.onMoveComplete.addOnce(resolve);
    });
  }

  stop() {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.animations.stop();
    switch(this.facing) {
      case Phaser.ANGLE_UP:
        this.frame = this._frameDirections.up;
        break;
      case Phaser.ANGLE_RIGHT:
        this.frame = this._frameDirections.right;
        break;
      case Phaser.ANGLE_DOWN:
        this.frame = this._frameDirections.down;
        break;
      case Phaser.ANGLE_LEFT:
        this.frame = this._frameDirections.left;
        break;
    }
  }

  // Because we want to set maxHealth > 100 (Phaser keeps maxHealth at 100)
  _normalizeHealth(amount) {
    return (amount / this._maxHealth) * this.maxHealth;
  }

  damage(amount) {
    super.damage(this._normalizeHealth(amount));
  }

  heal(amount) {
    super.heal(this._normalizeHealth(amount));
  }
}
