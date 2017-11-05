const MoveLeftAction = function(hero) {
  this._hero = hero;
};

MoveLeftAction.prototype.getName = function() { return 'moveLeft'; };
MoveLeftAction.prototype.perform = function() {
  const hero = this._hero;
  hero.game.physics.arcade.moveToXY(hero, hero.x - 5, hero.y, hero.getSpeed());
  hero.animations.play('left');
  hero.direction = hero.constants.directions.LEFT;
};
