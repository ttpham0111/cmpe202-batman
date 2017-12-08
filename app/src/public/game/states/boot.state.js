class BootState extends Phaser.State {
  create() {
    super.create();

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.state.start(Constants.STATES.PRELOADER);
  }
}