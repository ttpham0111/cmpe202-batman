Vue.component('bw-app', {
  template: `
    <b-container fluid>
      <b-row class="h-100 p-3">
        <b-col cols="5">
          <bw-editor v-model="editor" class="h-100" @run="runCode"></bw-editor>
        </b-col>
        
        <b-col cols="7">
          <bw-game-screen class="h-100"
                          v-model="currentState" :editor="editor"
                          @show-tutorial="showTutorial = true"></bw-game-screen>
        </b-col>
      </b-row>
      <todo-tutorial v-if="showTutorial" :stateKey="currentState.key"></todo-tutorial>
    </b-container>
  `,

  data: function() {
    return {
      currentState: null,
      editor: null,
      showTutorial: false
    };
  },

  methods: {
    runCode: function() {
      this.showTutorial = false;
      this.currentState.run();
    }
  }
});