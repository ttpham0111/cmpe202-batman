class PreloaderState extends Phaser.State {
  preload() {
    super.preload();

    this._load_images();
    this._load_sprites();
    this._load_maps();
    this._load_audio();
  }

  create() {
    super.create();

    this.state.start(Constants.STATES.INTRO);
  }

  _load_images() {
    this.load.image(MainMenuState.ASSETS.BACKGROUND, 'public/game/assets/main-menu-bg.png');
    this.load.image(MainMenuState.ASSETS.TEXT, 'public/game/assets/main-menu-text.png');
    this.load.spritesheet(MainMenuState.ASSETS.OVERLAY, 'public/game/assets/main-menu-overlay.png', 476, 243);
  }


  _load_sprites() {
    this.load.atlasXML(Player.SPRITE_KEY,
                       'public/game/assets/sprites/player/link.png',
                       'public/game/assets/sprites/player/link.xml');

    this.load.atlasXML(ChuchuGreen.SPRITE_KEY,
                       'public/game/assets/sprites/enemies/chuchu/chuchu-green.png',
                       'public/game/assets/sprites/enemies/chuchu/chuchu-green.xml');

    this.load.atlasXML(ChuchuBlue.SPRITE_KEY,
                       'public/game/assets/sprites/enemies/chuchu/chuchu-blue.png',
                       'public/game/assets/sprites/enemies/chuchu/chuchu-blue.xml');
  }

  _load_maps() {
    for (let i = 1; i <= Constants.NUM_LEVELS; i++) {
      this.load.tilemap(Constants.LEVEL_PREFIX + i,
                        'public/game/assets/map/levels/level-' + i + '.json',
                        null, Phaser.Tilemap.TILED_JSON);
    }

    this.load.image(Constants.ASSET_KEYS.TILESET_IMAGE_FIELD_1_DARK,
                    'public/game/assets/map/tilesets/field-1-dark.png');
  }

  _load_audio() {

  }
}