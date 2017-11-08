Vue.component('modal-component', {
  template: `
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-body">
              <slot name="body">
                {{modalText}}
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button class="modal-default-button" @click="$emit('close')">
                  OK
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  `,

  props: {
    modalText: Object
  },

  data: function() {
    return {
      context: {}
    };
  }
});