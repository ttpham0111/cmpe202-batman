Vue.component('todo-editor', {
  template: `
    <div ref="editor"></div>
  `,

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
  }
});