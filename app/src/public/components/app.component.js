Vue.component('todo-app', {
  template: `
    <b-container fluid>
      <b-row class="h-100 p-3">
        <b-col cols="5">
          <todo-editor :context="context" class="h-100"></todo-editor>
        </b-col>
        
        <b-col cols="7">
          <todo-game-screen :context="context" class="h-100"></todo-game-screen>
        </b-col>
      </b-row>
      <modal-component :modalText="context.modalText" v-if="context.showModal" @close="context.closeModal()"></modal-component>
    </b-container>
  `,

  data: function() {
    return {
      context: {
        showModal: false,
        modalText: ""
      }
    };
  }
});