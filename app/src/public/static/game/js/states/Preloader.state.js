Game.Preloader = function() {};

Game.Preloader.prototype = {
  preload: function() {
    game.load.spritesheet('hero-link', 'public/static/game/assets/link.jpg', 24, 32);
  },

  create: function() {
    this.state.start('level-1');
  }
};