Vue.component('todo-editor', {
  template: `
    <div>
      <div class="h-75" ref="editor"></div>
      <b-btn @click="onRun" class="rounded-0" block>Run</b-btn>
    </div>
  `,

  props: {
    context: Object
  },

  data: function() {
    return {
      editor: null,
      editorOptions: {
        mode: 'javascript',
        theme: 'blackboard',
        lineNumbers: true
      }
    };
  },

  mounted: function() {
    this.editor = CodeMirror(this.$refs.editor, this.editorOptions);
    this.editor.setSize(null, '100%');
    this.$set(this.context.editor = this.editor);
  },

  methods: {
    onRun: function(){
      this.$emit('run');
    }
  }

});