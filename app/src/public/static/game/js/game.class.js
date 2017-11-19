class _Game {
  constructor() {
    this.WIDTH = 640;
    this.HEIGHT = 640;

    this.TILE_WIDTH = this.WIDTH / 30;
    this.TILE_HEIGHT = this.HEIGHT / 30;

    this.SPEED = 25000;

    this.SPRITE_HERO_KEY = 'hero';
    this.SPRITE_BULLET_KEY = 'bullet';

    const numLevels = 2;
    this.states = {
      BOOT: 'boot',
      PRELOADER: 'preloader',
    };

    for (let i = 1; i <= numLevels; i++) {
      this.states['LEVEL_' + i] = 'level-' + i;
      this['level' + i] = {
        TILESPRITE_KEY: 'level-' + i + '-tilesprite',
        TILEMAP_KEY: 'level-' + i + '-tilemap',
        TILESET_IMAGE_KEY: 'level-' + i + '-tileset-image',
      }
    }
  }
}

const Game = new _Game();
