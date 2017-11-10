Game.Preloader = function() {};

Game.Preloader.prototype = {
  preload: function() {
    game.load.spritesheet('hero', 'public/static/game/assets/hero.png', 64, 64);
    game.load.image("ivy", "public/static/game/assets/enemies/ivy.png");
    game.load.image("riddler", "public/static/game/assets/enemies/riddler.png");
  },

  create: function() {
    this.state.start('level-1');
  }
};