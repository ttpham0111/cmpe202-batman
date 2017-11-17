const Hero = function(game, x, y, key, group, initialStats) {
  /**
   * Phaser Init step
   */
  group = group || game.world;

  // Call parent constructor and set attributes
  Phaser.Sprite.call(this, game, x, y, key);

  // Enable physics
  game.physics.arcade.enable(this);
  this.body.collideWorldBounds = true;

  // Add animations
  const numFrames = 9;
  const animationSpeed = 15;
  this.animations.add('up', Array.from(new Array(numFrames), (x, i) => i), animationSpeed, true);
  this.animations.add('left', Array.from(new Array(numFrames), (x, i) => i + numFrames), animationSpeed, true);
  this.animations.add('down', Array.from(new Array(numFrames), (x, i) => i + (numFrames * 2)), animationSpeed, true);
  this.animations.add('right', Array.from(new Array(numFrames), (x, i) => i + (numFrames * 3)), animationSpeed, true);

  // Add to group
  group.add(this);

  /**
   * Game Init step
   */
  // Constants
  this.constants = {
    directions: {
      UP: 0,
      RIGHT: 1,
      DOWN: 2,
      LEFT: 3
    },

    frameDirections: {
      UP: 0,
      LEFT: numFrames,
      DOWN: numFrames * 2,
      RIGHT: numFrames * 3
    }
  };

  // Attributes
  initialStats = initialStats || {
    maxHealth: 100,
    strength: 10,
    speed: 100
  };

  this._name = 'TODO';
  this._maxHealth = initialStats.maxHealth;
  this._currentHealth = this._maxHealth;
  this._strength = initialStats.strength;
  this._speed = initialStats.speed;
  this._equipments = [];
  this._items = [];
  this._actions = {};

  this.direction = this.constants.directions.RIGHT;

  const defaultActions = [
    new MoveUpAction(this),
    new MoveRightAction(this),
    new MoveDownAction(this),
    new MoveLeftAction(this),
    new shoot(this)
  ];
  this.addActions(defaultActions);
};


// Inherit methods from parent
Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.getSpeed = function() {
  return this._speed;
};

Hero.prototype.getAction = function(name) {
  return this._actions[name];
};

Hero.prototype.addActions = function(actions) {
  const heroActions = this._actions;
  actions.forEach(function(action) {
    heroActions[action.getName()] = action;
  });
};

Hero.prototype.stop = function() {
  this.body.velocity.x = 0;
  this.body.velocity.y = 0;
  this.animations.stop();
  switch(this.direction) {
    case this.constants.directions.UP:
      this.frame = this.constants.frameDirections.UP;
      break;
    case this.constants.directions.RIGHT:
      this.frame = this.constants.frameDirections.RIGHT;
      break;
    case this.constants.directions.DOWN:
      this.frame = this.constants.frameDirections.DOWN;
      break;
    case this.constants.directions.LEFT:
      this.frame = this.constants.frameDirections.LEFT;
      break;
  }
};