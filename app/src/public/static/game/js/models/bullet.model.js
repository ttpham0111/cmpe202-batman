var bullets ; 
var enemyBullets ;
var EnemyBulletTime  = 0 ; 


const Bullets = function(game, x, y, key, key2 ,  group, initialStats) {

    group = group || game.world;
    
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(5, key);
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(5, key2);
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);
}



Bullets.prototype.getBullets = function() {
  return bullets ; 
}

Bullets.prototype.getEnemyBullets = function() {
  return enemyBullets ; 
}

Bullets.prototype.enemyShootRight = function(EnamyBulletsObj , x , y  , time){
    if(EnamyBulletsObj != null){
       if(time > EnemyBulletTime){
          enemyBullet = EnamyBulletsObj.getFirstExists(false);
          if(enemyBullet){
            enemyBullet.reset(x, y);
            enemyBullet.body.velocity.x = -200 ; 
            EnemyBulletTime = time + 1000 ; 
          }
        }
    }

   
}


Bullets.prototype.enemyShootLeft = function(EnamyBulletsObj , x , y  , time){
     if(EnamyBulletsObj != null){
        if(time > EnemyBulletTime){
          enemyBullet = EnamyBulletsObj.getFirstExists(false);
          if(enemyBullet){
            enemyBullet.reset(x, y);
            enemyBullet.body.velocity.x = +200 ; 
            EnemyBulletTime = time + 1000 ; 
          }
        }
     }
    
}