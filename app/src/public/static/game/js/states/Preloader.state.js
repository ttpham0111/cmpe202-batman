Game.Preloader = function() {};

Game.Preloader.prototype = {
  preload: function() {
    this.load.spritesheet('hero', 'public/static/game/assets/hero.png', 64, 64);


    this.load.tilemap("map_level_1", "public/static/game/assets/Maps/level_1/Town.csv");
	this.load.image("tileset_level_1" , "public/static/game/assets/Maps/level_1/Town_Objects.png");
	this.load.image("background_level_1", "public/static/game/assets/Maps/level_1/Town_Background.png", 640, 640 );

    this.load.image("ivy", "public/static/game/assets/enemies/ivy.png");
    this.load.image("riddler", "public/static/game/assets/enemies/riddler.png");

  },

  create: function() {
    this.state.start('level-1');
  }
};