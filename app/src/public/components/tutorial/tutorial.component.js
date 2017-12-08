Vue.component('z-tutorial', {
  template: `
    <div>
      <b-modal ref="modal" :class="currentStep.modalClass" size="sm"
               no-close-on-esc no-close-on-backdrop no-fade
               hide-header hide-footer>
        <p>{{ currentStep.modalText }}</p>
        <div class="text-right">
          <button @click="onNext">Next</button>
        </div>
      </b-modal>
      <b-tooltip ref="tooltip" triggers="manual" :placement="currentStep.pointerPlacement"
        :target="currentStep.pointerTarget" container="tutorial">
        <img :class="'animated-' + currentStep.pointerDirection + '-arrow'"
             :src="'public/images/tutorial/arrow-' + currentStep.pointerDirection + '.png'" />
      </b-tooltip>
    </div>
  `,

  props: {
    level: String
  },

  data: function() {
    const tutorials = {};
    tutorials[Constants.STATES.LEVEL_PREFIX + 1] = Tutorial1Step1;

    const noTutorialState = new NoTutorialState(this);
    return {
      tutorials: tutorials,
      noTutorialState: noTutorialState,
      currentStep: noTutorialState
    };
  },

  computed: {
    firstStep: function() {
      if (this.tutorials[this.level]) return new this.tutorials[this.level](this);
      else return this.noTutorialState;
    }
  },

  watch: {
    level: function() {
      this.currentStep.end();
      this.currentStep = this.firstStep;
      this.play();
    }
  },

  mounted: function() {
    this.currentStep = this.firstStep;
    this.play();
  },

  methods: {
    createPointer: function() {
      return this.$refs.tooltip.createToolpop();
    },

    showModal: function() {
      this.$refs.modal.show();
    },

    hideModal: function() {
      this.$refs.modal.hide();
    },

    play: function() {
      this.$nextTick(() => {
        this.currentStep.play();
      });
    },

    onNext: function() {
      this.currentStep.next();
    },

    next: function(nextStep) {
      this.currentStep.end();

      if (nextStep) {

        // Pointer takes a while to be destroyed...
        setTimeout(() => {
          this.currentStep = new nextStep(this);
          this.play();
        }, 250);
      }
    }
  }
});
