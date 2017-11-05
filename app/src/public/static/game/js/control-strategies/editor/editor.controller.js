const EditorController = function(context) {
  this._hero = context.hero;
  this._editor = context.input;
};

EditorController.prototype.update = function() {
  console.log(this._editor.getValue());
};
