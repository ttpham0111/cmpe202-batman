class IntroState extends Phaser.State {
  create() {
    super.create();

    // Skip the intro for now
    this.state.start(Constants.STATES.MAIN_MENU);
  }
}