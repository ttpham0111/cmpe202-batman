const EditorController = function() {};

EditorController.prototype.heroHandler = function(hero, input) {
  this.hero = hero;
  this.input = input;
  this.commands = new EditorController.Commands();
};
