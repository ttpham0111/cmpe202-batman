Vue.component('todo-editor', {
  template: `
    <div>
      <div class="h-75" ref="editor"></div>
      <b-btn @click="onRun" class="rounded-0" id="run-btn" block>Run</b-btn>
    </div>
  `,

  model: {
    prop: 'editor',
    event: 'init'
  },

  props: {
    editor: Object
  },

  data: function() {
    return {
      editorOptions: {
        mode: 'javascript',
        theme: 'blackboard',
        lineNumbers: true
      }
    };
  },

  mounted: function() {
    const editor = CodeMirror(this.$refs.editor, this.editorOptions);
    editor.setSize(null, '100%');
    this.$emit('init', editor);
  },

  methods: {
    onRun: function(){
      this.$emit('run');
    }
  }

});