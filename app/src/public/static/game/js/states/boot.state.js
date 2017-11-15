Game.Boot = function() {};

Game.Boot.prototype = {
  create: function() {
    this.state.start(Game.states.PRELOADER);
  }
};
