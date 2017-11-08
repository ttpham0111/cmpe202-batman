Game.Preloader = function() {};

Game.Preloader.prototype = {
  preload: function() {
    game.load.spritesheet('hero', 'public/static/game/assets/hero.png', 64, 64);
  },

  create: function() {
    this.state.start('level-1');
  }
};