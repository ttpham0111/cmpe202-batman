Vue.component('todo-tutorial', {
  template: `
    <div id="tutorial">
      <b-modal ref="modal" :class="modalClass" size="sm"
              no-close-on-esc no-close-on-backdrop no-fade
              hide-header hide-footer>
              <p>{{modalText}}</p>
              <div class="text-right">
                <button @click="onNext">Next</button>
              </div>
      </b-modal>
      <b-tooltip ref="tooltip" triggers="manual" :placement="tooltipPlacement"
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
      modalClass: '',
      currentTarget: '',
      tooltipPlacement: '',
      tooltipSrc: '',
      tooltipClass: '',
      currentTutorialStep: 0,
      tooltipRef:null
    };
  },

  mounted: function() {
    this.currentTutorialStep = 0;
    this.modalText = tutorials[this.stateKey][this.currentTutorialStep].modalText;
    this.modalClass = tutorials[this.stateKey][this.currentTutorialStep].modalClass;
    this.$refs.modal.show();
    this.currentTarget = tutorials[this.stateKey][this.currentTutorialStep].currentTarget;
    this.tooltipPlacement = tutorials[this.stateKey][this.currentTutorialStep].tooltipPlacement;
    this.tooltipSrc = tutorials[this.stateKey][this.currentTutorialStep].tooltipSrc;
    this.tooltipClass = tutorials[this.stateKey][this.currentTutorialStep].tooltipClass;
    this.$nextTick(() => {
      this.tooltipRef = this.$refs.tooltip.createToolpop();
      this.tooltipRef.show();
    });
  },

  methods: {
    onNext: function(){
      this.currentTutorialStep++;
      if(this.currentTutorialStep < tutorials[this.stateKey].length){
        this.modalText = tutorials[this.stateKey][this.currentTutorialStep].modalText;
        this.modalClass = tutorials[this.stateKey][this.currentTutorialStep].modalClass;
        this.$refs.modal.show();
        this.currentTarget = tutorials[this.stateKey][this.currentTutorialStep].currentTarget;
        this.tooltipPlacement = tutorials[this.stateKey][this.currentTutorialStep].tooltipPlacement;
        this.tooltipSrc = tutorials[this.stateKey][this.currentTutorialStep].tooltipSrc;
        this.tooltipClass = tutorials[this.stateKey][this.currentTutorialStep].tooltipClass;
        this.$nextTick(() => {
          this.tooltipRef = this.$refs.tooltip.createToolpop();
          this.tooltipRef.show();
        });
      } else {
        this.$refs.modal.hide();
        this.tooltipRef.hide();
      }
    }
  }

});

var tutorials = {
  "level-1":[
    {
      modalText:"This is the game screen",
      modalClass:"left-aligned-modal",
      currentTarget:"game-screen",
      tooltipPlacement:"left",
      tooltipSrc:"public/static/game/assets/tutorial_arrows/right.png",
      tooltipClass:"animated-right-arrow"
    },
    {
      modalText:"This is the code editor screen",
      modalClass:"right-aligned-modal",
      currentTarget:"editor-screen",
      tooltipPlacement:"right",
      tooltipSrc:"public/static/game/assets/tutorial_arrows/left.png",
      tooltipClass:"animated-left-arrow"
    },
    {
      modalText:"Press 'Run' to execute the code",
      modalClass:"right-aligned-modal",
      currentTarget:"run-btn",
      tooltipPlacement:"top",
      tooltipSrc:"public/static/game/assets/tutorial_arrows/down.jpg",
      tooltipClass:"animated-down-arrow"
    }
  ]
}