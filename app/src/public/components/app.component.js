Vue.component('todo-app', {
  template: `
    <b-container fluid>
      <b-row class="h-100 p-3">
        <b-col cols="5">
          <todo-editor :context="context" class="h-100" @run="runCode"></todo-editor>
        </b-col>
        
        <b-col cols="7">
          <todo-game-screen class="h-100"
                            v-model="currentState" :context="context"
                            @show-tutorial="showTutorial = true"></todo-game-screen>
        </b-col>
      </b-row>
      
      <todo-tutorial v-if="showTutorial" :state-key="currentState.key"></todo-tutorial>
    </b-container>
  `,

  data: function() {
    return {
      currentState: null,
      showTutorial: false,
      context: {}
    };
  },

  methods: {
    runCode: function() {
      this.currentState.run();
    }
  }
});