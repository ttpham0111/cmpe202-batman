Game.Level1 = function(editor) {
  this.showTutorial = true;
  this._editor = editor;
};

var map;
var layer;
var bullets ; 

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
    
   
    

    bullets = this.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
    

    this.control = new KeyboardController({
      hero: this.hero,
      input: this.input.keyboard ,
      bullets : bullets ,
      game : this.game
    });

    var enemy;
    var enemies = [];
    var factory = new Factory();
    enemies.push(factory.createEnemies(this.game,"ivy"));
    enemies.push(factory.createEnemies(this.game,"joker"));
    enemies.push(factory.createEnemies(this.game,"riddler"));
    enemies.push(factory.createEnemies(this.game,"Freeze"));
    enemies.push(factory.createEnemies(this.game,"scarecrow"));
    
    for (var i = 0, len = enemies.length; i < len; i++) {
      enemies[i].showType();
    }
    
  },

  update: function() {
    this.control.update();
    this.physics.arcade.collide(this.hero , layer);
  },

  run: function() {
    console.log('Running level 1...');
    if(true){
      console.log('Starting level 2...');
    } else {
      console.log('Game over!');
    }
  }
};
