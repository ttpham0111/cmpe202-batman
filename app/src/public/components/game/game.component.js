Vue.component('todo-game-screen', {
  template: `
    <div ref="game"></div>
  `,

  mounted: function() {
    const gameEl = this.$refs.game;
    game = new Phaser.Game(gameEl.clientWidth, gameEl.clientHeight, Phaser.AUTO, gameEl);
    game.state.add('boot', Game.Boot);
    game.state.add('preloader', Game.Preloader);
    game.state.add('level-1', Game.Level1);
    game.state.start('boot');
  }
});