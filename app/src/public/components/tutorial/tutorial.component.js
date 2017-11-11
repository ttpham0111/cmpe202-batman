Vue.component('todo-tutorial', {
  template: `
    <div id="tutorial">
      <b-modal ref="modal" class="text-center" size="sm"
               header-bg-variant="dark" header-text-variant="light"
               centered hide-footer ok-only
               @hide="onClose">{{ modalText }}</b-modal>

      <b-tooltip ref="tooltip" triggers="manual"
                 :target="currentTarget" container="tutorial">
        <img class="animated-down-arrow" src="public/static/game/assets/down.jpg" />
      </b-tooltip>
    </div>
  `,

  props: {
    stateKey: Object
  },

  data: function() {
    return {
      modalText: '',
      currentTarget: ''
    };
  },

  mounted: function() {
    switch (this.stateKey) {
      case Game.states.LEVEL_1:
        this.modalText = "Press 'Run' to get the character moving!";
        this.$refs.modal.show();
        break;
    }
  },

  methods: {
    onClose: function(){
      switch (this.stateKey) {
        case Game.states.LEVEL_1:
          this.currentTarget = 'run-btn';
          this.$nextTick(() => {
            this.$refs.tooltip.createToolpop().show();
          });
          break;
        default:
          break;
      }
    }
  }

});