Vue.component('bw-editor', {
  template: `
    <div>
      <div class="h-75" ref="editor" id="editor-screen"></div>
      <b-btn @click="$emit('run')" class="rounded-0" block id="run-btn">Run</b-btn>
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
  }
});