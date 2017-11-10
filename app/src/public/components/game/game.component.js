Vue.component('todo-game-screen', {
  template: `
    <div ref="game"></div>
  `,

  model: {
    prop: 'currentState',
    event: 'change'
  },

  props: {
    context: Object,
    currentState: Object
  },

  mounted: function() {
    const self = this;
    const gameEl = this.$refs.game;
    game = new Phaser.Game(640, 640, Phaser.AUTO, gameEl);

    game.state.add('boot', new Game.Boot());
    game.state.add('preloader', new Game.Preloader());
    game.state.add('level-1', new Game.Level1(this.context.editor));
    game.state.start('boot');

    game.state.onStateChange.add(function(stateKey) {
      const state = game.state.states[stateKey];
      if (state.showTutorial) self.$emit('show-tutorial');
      self.$emit('change', state);
    });
  }
});