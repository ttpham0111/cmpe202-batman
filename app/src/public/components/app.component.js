Vue.component('todo-app', {
  template: `
    <b-container fluid>
      <b-row class="h-100 p-3">
        <b-col cols="5">
          <todo-editor v-model="editor" class="h-100" @run="runCode"></todo-editor>
        </b-col>
        
        <b-col cols="7">
          <todo-game-screen class="h-100"
                            v-model="currentState" :editor="editor"
                            @show-tutorial="showTutorial = true"></todo-game-screen>
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