class MainMenuState extends Phaser.State {
  static get ASSETS() {
    return {
      BACKGROUND: 'main-menu-bg',
      TEXT: 'main-menu-text',
      OVERLAY: 'main-menu-overlay'
    }
  }

  create() {
    const centerX = this.world.centerX;
    const centerY = this.world.centerY;
    this.add.image(centerX, centerY, MainMenuState.ASSETS.BACKGROUND).anchor.setTo(.5, .5);

    const overlay = this.add.sprite(centerX + 4, centerY, MainMenuState.ASSETS.OVERLAY);
    overlay.anchor.setTo(.5, .5);
    overlay.alpha = .5;
    this.add.tween(overlay).to({ alpha: 0.1 }, 5e3, undefined, true, undefined, -1, true);
    overlay.animations.add('default', [1, 2, 3, 4], .7, true);
    overlay.animations.play('default');

    const text = this.add.image(centerX, centerY + 64, MainMenuState.ASSETS.TEXT);
    text.anchor.setTo(.5, .5);
    this.add.tween(text).to({ alpha: 0.5 }, 1e3, undefined, true, undefined, -1, true);
  }

  update() {
    super.update();

    if (this.input.activePointer.isDown) this._play();
  }

  _play() {
    this.state.start(Constants.STATES.LEVEL_PREFIX + 1);
  }
}