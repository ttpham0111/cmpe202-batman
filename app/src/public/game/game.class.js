class Game extends Phaser.Game {
  constructor(parent) {
    super(Constants.GAME_WIDTH, Constants.GAME_HEIGHT,
          Phaser.AUTO, parent, undefined, undefined, false);

    this.state.add(Constants.STATES.BOOT, BootState, false);
    this.state.add(Constants.STATES.PRELOADER, PreloaderState, false);
    this.state.add(Constants.STATES.INTRO, IntroState, false);
    this.state.add(Constants.STATES.MAIN_MENU, MainMenuState, false);

    for (let i = 1; i <= Constants.NUM_LEVELS; i++) {
      this.state.add(Constants.STATES.LEVEL_PREFIX + i, (eval('Level' + i)), false);
    }

    this.state.add(Constants.STATES.GAME_OVER, GameOverState, false);

    this.state.start(Constants.STATES.BOOT);
  }
}
