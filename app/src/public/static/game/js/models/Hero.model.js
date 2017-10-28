const Hero = function(game, x, y, key, group, input) {
  if (typeof group === 'undefined') { group = game.world; }

  // Call parent constructor and set attributes
  Phaser.Sprite.call(this, game, x, y, key);
  this.input = input;
  this.speed = 100;

  // Enable physics
  game.physics.arcade.enable(this);
  this.body.collideWorldBounds = true;

  // Add animations
  const numFrames = 12;
  this.animations.add('up', Array.from(new Array(numFrames), (x, i) => i), 10, true);
  this.animations.add('right', Array.from(new Array(numFrames), (x, i) => i + numFrames), 10, true);
  this.animations.add('down', Array.from(new Array(numFrames), (x, i) => i + (numFrames * 2)), 10, true);
  this.animations.add('left', Array.from(new Array(numFrames), (x, i) => i + (numFrames * 3)), 10, true);

  // Add to group
  group.add(this);
};


// Inherit methods from parent
Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;
