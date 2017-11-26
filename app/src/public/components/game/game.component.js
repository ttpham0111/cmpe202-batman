Vue.component('bw-game-screen', {
  template: `
    <div ref="game" id="game-screen"></div>
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
    this.$nextTick(() => {
      const editor = this.editor;
      const gameEl = this.$refs.game;
      const game = new Phaser.Game(Game.WIDTH, Game.HEIGHT, Phaser.AUTO, gameEl);

      game.state.onStateChange.add((stateKey) => {
        const state = game.state.states[stateKey];
        if (state.showTutorial) this.$emit('show-tutorial');
        this.$emit('change', state);
      });

      game.state.add(Game.states.BOOT, new Game.Boot());
      game.state.add(Game.states.PRELOADER, new Game.Preloader());
      game.state.add(Game.states.LEVEL_1, new Game.Level1(editor));
      game.state.add(Game.states.LEVEL_2, new Game.Level2(editor));
      // game.state.add(Game.states.LEVEL_3, new Game.Level3(editor));

      game.state.start(Game.states.BOOT);

      //tutorial
      game.state.onStateChange.add((stateKey) => {
        const state = game.state.states[stateKey];
        if (state.showTutorial) this.$emit('show-tutorial');
        this.$emit('change', state);
      });
    });
  }
});