Vue.component('todo-tutorial', {
  template: `
    <div>
      <modal-component v-if="showModal" :modalText="modalText" @close="onClose"></modal-component>
    </div>
  `,

  props: {
    stateKey: Object
  },

  data: function() {
    return {
      modalText : "",
      showModal : false
    };
  },

  mounted: function() {
    switch(this.stateKey){
      case 'level-1':
        this.modalText = "Press 'Run' to get the character moving!";
        this.showModal = true;
        break;
      default:
        break;
    }
  },

  created: function(argument) {
    self = this;
    this.$parent.$on('hideTutorial', function(){
      switch(self.stateKey){
        case 'level-1':
          var child = document.getElementById('animatedDownArrow');
          child.parentNode.removeChild(child);
          break;
        default:
          break;
      }
    })
  },

  methods: {
    onClose: function(){
      switch(this.stateKey){
        case 'level-1':
          this.showModal = false;
          var btnEl = document.getElementById('runBtn');
          var imgElement = document.createElement("img");
          imgElement.id = 'animatedDownArrow';
          imgElement.src = 'public/static/game/assets/down.jpg';
          btnEl.appendChild(imgElement);
          break;
        default:
          break;
      }
    }
  }

});