class Constants {
  static get GAME_WIDTH() { return 480; }
  static get GAME_HEIGHT() { return 480; }

  static get STATES() {
    return {
      BOOT: 'state-boot',
      PRELOADER: 'state-preloader',
      INTRO: 'state-intro',
      MAIN_MENU: 'state-main-menu',
      LEVEL_PREFIX: 'state-level-',
      GAME_OVER: 'state-gameover'
    };
  }

  static get NUM_LEVELS() { return 2; }

  static get ASSET_KEYS() {
    return {
      TILESET_IMAGE_FIELD_1_DARK: 'field-1-dark'
    };
  }

  static get DIRECTION_KEYS() {
    const data = {};
    data[Phaser.ANGLE_UP] = 'back';
    data[Phaser.ANGLE_RIGHT] = 'side';
    data[Phaser.ANGLE_DOWN] = 'front';
    data[Phaser.ANGLE_LEFT] = 'side';
    return data;
  }
}