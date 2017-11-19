Game.Preloader = function() {};

Game.Preloader.prototype = {
  preload: function() {
    this.load.spritesheet(Game.SPRITE_HERO_KEY, 'public/static/game/assets/characters/hero.png', 64, 64);

    this.load.spritesheet(Game.SPRITE_BULLET_KEY, 'public/static/game/assets/equips/bullets/bullet.jpg');

    this.load.image(Game.level1.TILESPRITE_KEY, 'public/static/game/assets/maps/level-1/grass.png', Game.WIDTH, Game.HEIGHT);
    this.load.tilemap(Game.level1.TILEMAP_KEY, 'public/static/game/assets/maps/level-1/objects.csv');
    this.load.image(Game.level1.TILESET_IMAGE_KEY, 'public/static/game/assets/maps/level-1/objects.png', Game.WIDTH, Game.HEIGHT);

    this.load.image(Game.level2.TILESPRITE_KEY, 'public/static/game/assets/maps/level-2/room.png', Game.WIDTH, Game.HEIGHT);
    this.load.tilemap(Game.level2.TILEMAP_KEY, 'public/static/game/assets/maps/level-2/objects.csv');
    this.load.image(Game.level2.TILESET_IMAGE_KEY, 'public/static/game/assets/maps/level-2/objects.png', Game.WIDTH, Game.HEIGHT);
  },

  create: function() {
    this.state.start(Game.states.LEVEL_1);
  }
};