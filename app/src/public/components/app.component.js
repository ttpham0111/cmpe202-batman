Vue.component('z-app', {
  template: `
    <b-container fluid>
      <z-tutorial v-if="showTutorial" id="tutorial" ref="tutorial" :level="currentLevel"></z-tutorial>
    
      <b-container class="h-100 d-flex flex-column pb-5">
        <b-row id="logo-wrapper" class="text-center py-3">
          <transition name="shrink-fade" mode="out-in">
            <div v-if="!gameStarted" key="logo" class="w-100">
              <img id="logo" class="img-fluid" src="public/images/logo.png">
            </div>
            <div v-else key="logo-sm" class="w-100">
              <img id="logo-sm" class="img-fluid" src="public/images/logo-sm.png">
            </div>
          </transition>
        </b-row>
      
        <b-row class="flex-fill">
          <b-col v-if="gameStarted" class="d-flex flex-column">
            <b-navbar type="dark" variant="dark">
              <b-navbar-nav class="ml-auto">
                <b-nav-form>
                  <b-form-checkbox v-model="showTutorial" class="text-light">
                    &nbsp;Tutorial
                  </b-form-checkbox>
                
                  <b-form-checkbox v-model="useKeyboard" class="text-light">
                    &nbsp;Keyboard
                  </b-form-checkbox>
                </b-nav-form>
              </b-navbar-nav>
            </b-navbar>
          
            <z-editor id="editor" class="flex-fill border border-top-0 border-bottom-0 border-dark"
                      v-model="editorText" :level-text="levelText"></z-editor>

            <b-btn id="btn-run" class="rounded-0" block
                   @click="onRun" >Run</b-btn>
          </b-col>
    
          <b-col id="game-screen" class="d-flex justify-content-center" ref="game"></b-col>
        </b-row>
      </b-container>
    </b-container>
  `,

  data: function() {
    return {
      game: null,
      editorText: '',
      levelText: '',
      gameStarted: false,
      currentLevel: '',
      showTutorial: false,
      useKeyboard: false
    };
  },

  watch: {
    useKeyboard: function() {
      this.toggleInput();
    }
  },

  mounted: function() {
    const gameEl = this.$refs.game;
    const game = new Game(gameEl);

    game.state.onStateChange.add((stateKey) => {
      if (stateKey === Constants.STATES.LEVEL_PREFIX + 1) this.gameStarted = true;
      if (this.gameStarted) this.currentLevel = stateKey;

      const state = this.game.state.states[stateKey];
      this.levelText = state.editorText || '';

      if (this.useKeyboard) {
        setTimeout(() => {
          this.toggleInput();
        });
      }
    });

    this.game = game;
  },

  methods: {
    onRun: function() {
      const input = this.editorText || this.levelText || '';
      this.game.state.getCurrentState().controller.update(input);
    },

    toggleInput: function() {
      this.game.state.getCurrentState().toggleInput();
    }
  }
});
