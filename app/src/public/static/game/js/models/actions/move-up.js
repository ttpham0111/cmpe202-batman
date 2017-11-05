const MoveUpAction = function(hero) {
  this._hero = hero;
};

MoveUpAction.prototype.getName = function() { return 'moveUp'; };
MoveUpAction.prototype.perform = function() {
  const hero = this._hero;
  hero.game.physics.arcade.moveToXY(hero, hero.x, hero.y - 5, hero.getSpeed());
  hero.animations.play('up');
  hero.direction = hero.constants.directions.UP;
};
