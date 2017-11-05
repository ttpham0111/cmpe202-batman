Vue.component('todo-game-screen', {
  template: `
    <div ref="game"></div>
  `,

  props: {
    context: Object
  },

  mounted: function() {
    const gameEl = this.$refs.game;
    game = new Phaser.Game(gameEl.clientWidth, gameEl.clientHeight, Phaser.AUTO, gameEl);
    game.state.add('boot', new Game.Boot());
    game.state.add('preloader', new Game.Preloader());
    game.state.add('level-1', new Game.Level1(this.context.editor));
    game.state.start('boot');
  }
});