Game.Level1 = function(editor) {
  this.editor = editor;
};

Game.Level1.prototype = {
  init: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
  },

  create: function() {
    this.hero = new Hero(this.game, 0, 0, 'hero-link');
    this.control = new EditorController({
      hero: this.hero,
      input: this.editor
    });
  },

  update: function() {
    this.control.update();
  }
};
