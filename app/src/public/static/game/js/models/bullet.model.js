var bullets ; 
const Bullets = function(game, x, y, key, group, initialStats) {

    group = group || game.world;
    
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, key);
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
}



Bullets.prototype.getBullets = function() {
  return bullets ; 
}