EditorController.Commands = function() {};

EditorController.Commands.prototype.moveUp = function(hero) {
  hero.body.velocity.x = 0;
  hero.body.velocity.y = -hero.speed;
  hero.animations.play('up');
};

EditorController.Commands.prototype.moveUpRight = function(hero) {
  hero.body.velocity.x = hero.speed;
  hero.body.velocity.y = -hero.speed;
  hero.animations.play('right');
};

EditorController.Commands.prototype.moveRight = function(hero) {
  hero.body.velocity.x = hero.speed;
  hero.body.velocity.y = 0;
  hero.animations.play('right');
};

EditorController.Commands.prototype.moveDownRight = function(hero) {
  hero.body.velocity.x = hero.speed;
  hero.body.velocity.y = hero.speed;
  hero.animations.play('right');
};

EditorController.Commands.prototype.moveDown = function(hero) {
  hero.body.velocity.x = 0;
  hero.body.velocity.y = hero.speed;
  hero.animations.play('down');
};

EditorController.Commands.prototype.moveDownLeft = function(hero) {
  hero.body.velocity.x = -hero.speed;
  hero.body.velocity.y = hero.speed;
  hero.animations.play('left');
};

EditorController.Commands.prototype.moveLeft = function(hero) {
  hero.body.velocity.x = -hero.speed;
  hero.body.velocity.y = 0;
  hero.animations.play('left');
};

EditorController.Commands.prototype.moveUpLeft = function(hero) {
  hero.body.velocity.x = -hero.speed;
  hero.body.velocity.y = -hero.speed;
  hero.animations.play('left');
};

EditorController.Commands.prototype.stop = function(hero) {
  hero.animations.stop();
  hero.body.velocity.x = 0;
  hero.body.velocity.y = 0;
};
