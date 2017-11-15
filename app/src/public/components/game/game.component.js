Vue.component('todo-game-screen', {
  template: `
    <div ref="game"></div>
  `,

  model: {
    prop: 'currentState',
    event: 'change'
  },

  props: {
    currentState: Object,
    editor: Object
  },

  mounted: function() {
    const gameEl = this.$refs.game;
    const game = new Phaser.Game(Game.WIDTH, Game.HEIGHT, Phaser.AUTO, gameEl);

    game.state.add(Game.states.BOOT, new Game.Boot());
    game.state.add(Game.states.PRELOADER, new Game.Preloader());
    game.state.add(Game.states.LEVEL_1, new Game.Level1(this.editor));
    game.state.add(Game.states.LEVEL_2, new Game.Level2(this.editor));
    game.state.add(Game.states.LEVEL_3, new Game.Level3(this.editor));
    game.state.start(Game.states.BOOT);

    game.state.onStateChange.add((stateKey) => {
      const state = game.state.states[stateKey];
      if (state.showTutorial) this.$emit('show-tutorial');
      this.$emit('change', state);
    });
  }
});