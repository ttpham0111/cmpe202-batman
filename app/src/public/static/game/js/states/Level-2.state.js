Game.Level2 = function(editor) {
  this.showTutorial = true;
  this._editor = editor;
};

const map;
const layer;
const bullets ; 

Game.Level2.prototype = {
  init: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
  },

  create: function() {

    //----Changes for each level------//
    this.add.tileSprite(0, 0, 640, 640, 'background_level_2');
    map = this.add.tilemap('map_level_2');
    map.addTilesetImage('tileset_level_2');
    layer = map.createLayer(0) ;
    layer.resizeWorld() ;
    map.setCollisionBetween(0 , 500);
    //map.setCollision([155,135] , false) ; 

    //----Changes End------//

    this.hero = new Hero(this.game, 0, 0, 'hero');
    

    //Palash

    bullets = this.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
    //Palash end 

    this.control = new KeyboardController({
      hero: this.hero,
      input: this.input.keyboard ,
      bullets : bullets ,
      game : this.game
    });

    var enemy;
    var enemies = [];
    var factory = new Factory();
    enemies.push(factory.createEnemies("ivy"));
    enemies.push(factory.createEnemies("joker"));
    enemies.push(factory.createEnemies("riddler"));
    enemies.push(factory.createEnemies("Freeze"));
    enemies.push(factory.createEnemies("scarecrow"));
    
    for (var i = 0, len = enemies.length; i < len; i++) {
      enemies[i].showType();
    }
    
  },

  update: function() {
    this.control.update();
    this.physics.arcade.collide(this.hero , layer);
  },

  run: function() {
    console.log('Running level 2...');
    if(true){
      console.log('Starting level 3...');
    } else {
      console.log('Game over!');
    }
  }
};
