Vue.component('todo-tutorial', {
  template: `
    <div id="tutorial">
      <b-modal ref="modal" class="text-center" size="sm"
               header-bg-variant="dark" header-text-variant="light"
               centered hide-footer ok-only
               @hide="onClose">{{ modalText }}</b-modal>

      <b-tooltip ref="tooltip" triggers="manual"
                 :target="currentTarget" container="tutorial">
        <img :class="tooltipClass" :src="tooltipSrc" />
      </b-tooltip>
    </div>
  `,

  props: {
    stateKey: Object
  },

  data: function() {
    return {
      modalText: '',
      currentTarget: '',
      tooltipSrc: '',
      tooltipClass: ''
    };
  },

  mounted: function() {
    switch (this.stateKey) {
      case Game.states.LEVEL_1:
        this.modalText = "Press 'Run' to get the character moving!";
        this.$refs.modal.show();
        break;
      case Game.states.LEVEL_2:
        this.modalText = "Fix the code in the editor to move the character to destination!";
        this.$refs.modal.show();
        break;
      default:
        break;
    }
  },

  methods: {
    onClose: function(){
      switch (this.stateKey) {
        case Game.states.LEVEL_1:
          this.currentTarget = 'run-btn';
          this.tooltipSrc = 'public/static/game/assets/down.jpg';
          this.tooltipClass = 'animated-down-arrow';
          this.$nextTick(() => {
            this.$refs.tooltip.createToolpop().show();
          });
          break;
        case Game.states.LEVEL_2:
          this.currentTarget = 'editor';
          this.tooltipSrc = 'public/static/game/assets/left.png';
          this.tooltipClass = 'animated-left-arrow';
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