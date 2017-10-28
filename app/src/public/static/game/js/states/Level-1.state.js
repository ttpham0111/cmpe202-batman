Game.Level1 = function() {};

Game.Level1.prototype = {
  init: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
  },

  create: function() {
    this.hero = new Hero(this.game, 0, 0, 'hero-link');
  }
};
