Game.Level1 = function(editor) {
  this.showTutorial = true;
  this._editor = editor;
};

var map;
var layer;
var bulletsObj ; 
var EnamyBulletsObj ; 


Game.Level1.prototype = {
  init: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
  },

  create: function() {

    //----Changes for each level------//
    this.add.tileSprite(0, 0, 640, 640, 'background_level_1');
    map = this.add.tilemap('map_level_1');
    map.addTilesetImage('tileset_level_1');
    layer = map.createLayer(0) ;
    layer.resizeWorld() ;
    map.setCollisionBetween(0 , 500);
    map.setCollision([155,135] , false) ; 

    //----Changes End------//

    this.hero = new Hero(this.game, 0, 0, 'hero');
    
    this.bullets = new Bullets(this.game, 0, 0, 'bullet' , 'enemyBullet');
    bulletsObj = this.bullets.getBullets() ; 
    EnamyBulletsObj = this.bullets.getEnemyBullets() ; 



    this.control = new KeyboardController({
      hero: this.hero,
      input: this.input.keyboard ,
      bullets : bulletsObj ,
      game : this.game
    });

    var enemy;
    var enemies = [];
    this.factory = new Factory();
    enemies.push(this.factory.createEnemies(this.game,"ivy"));
    enemies.push(this.factory.createEnemies(this.game,"joker"));
    enemies.push(this.factory.createEnemies(this.game,"riddler"));
    enemies.push(this.factory.createEnemies(this.game,"Freeze"));
    enemies.push(this.factory.createEnemies(this.game,"scarecrow"));

    //getEnemiesToKill
    this.enemiesToKill = this.factory.getEnemiesToKill(this.game, 'enemy');

  },

  update: function() {
    this.control.update();
    this.physics.arcade.collide(this.hero , layer);
    this.physics.arcade.overlap(bulletsObj , this.enemiesToKill , this.factory.killEnemies  , null , this) ; 
    


    if(new Date().getSeconds() % 3 == 0){

      this.bullets.enemyShootRight(EnamyBulletsObj , this.enemiesToKill.x+50 ,  this.enemiesToKill.y+60 , this.game.time.now )

    }

    if(new Date().getSeconds() % 2 == 0){
      this.bullets.enemyShootLeft(EnamyBulletsObj , this.enemiesToKill.x+50 ,  this.enemiesToKill.y+60 , this.game.time.now )

    }
    
  },

  run: function() {
    console.log('Running level 1...');
    if(true){
      console.log('Starting level 2...');
      this.state.start(Game.states.LEVEL_2);
    } else {
      console.log('Game over!');
    }
  }

};
