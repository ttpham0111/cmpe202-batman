const MoveDownAction = function(hero) {
  this._hero = hero;
};

MoveDownAction.prototype.getName = function() { return 'moveDown'; };
MoveDownAction.prototype.perform = function() {
  const hero = this._hero;
  hero.game.physics.arcade.moveToXY(hero, hero.x, hero.y + 5, hero.getSpeed());
  hero.animations.play('down');
  hero.direction = hero.constants.directions.DOWN;
};
