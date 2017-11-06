var bullets ; 

const Bullet = function(game, x, y, key, group, initialStats) {

  console.log("Bullet key  " , key ) ; 



  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, key);
  bullets.setAll('anchor.x', 0.5);
  bullets.setAll('anchor.y', 1);
  bullets.setAll('outOfBoundsKill', true);
  bullets.setAll('checkWorldBounds', true);
  
  



}




Bullet.prototype.shoot = function(){
	console.log("Palasj") ;
}