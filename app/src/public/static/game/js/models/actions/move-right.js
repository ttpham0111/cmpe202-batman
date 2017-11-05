const MoveRightAction = function(hero) {
  this._hero = hero;
};

MoveRightAction.prototype.getName = function() { return 'moveRight'; };
MoveRightAction.prototype.perform = function() {
  const hero = this._hero;
  hero.game.physics.arcade.moveToXY(hero, hero.x + 5, hero.y, hero.getSpeed());
  hero.animations.play('right');
  hero.direction = hero.constants.directions.RIGHT;
};
