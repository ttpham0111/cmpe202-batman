Vue.component('z-editor', {
  template: `
    <div ref="editor"></div>
  `,

  props: {
    value: String,
    levelText: String
  },

  data: function() {
    return {
      editor: null,
      editorOptions: {
        mode: 'javascript',
        theme: 'tomorrow-night-bright',
        lineNumbers: true
      }
    };
  },

  watch: {
    levelText: function(value) {
      this.editor.setValue(value);
    }
  },

  mounted: function() {
    const editor = CodeMirror(this.$refs.editor, this.editorOptions);
    editor.setSize(null, '100%');
    editor.setValue(this.value || this.levelText);

    editor.on('change', (editor) => {
      this.$emit('input', editor.getValue());
    });

    this.editor = editor;
  },
});
