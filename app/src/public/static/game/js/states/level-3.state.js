Game.Level3 = function(editor) {
  this.showTutorial = true;
  this._editor = editor;
};

var map;
var layer;
var bullets ; 

Game.Level3.prototype = {
  init: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
  },

  create: function() {

    //----Changes for each level------//
    this.add.tileSprite(0, 0, 640, 640, 'background_level_3');
    map = this.add.tilemap('map_level_3');
    map.addTilesetImage('tileset_level_3');
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
    this.factory = new Factory();
    enemies.push(this.factory.createEnemies(this.game,"ivy"));
    enemies.push(this.factory.createEnemies(this.game,"joker"));
    enemies.push(this.factory.createEnemies(this.game,"riddler"));
    enemies.push(this.factory.createEnemies(this.game,"Freeze"));
    enemies.push(this.factory.createEnemies(this.game,"scarecrow"));
    
    for (var i = 0, len = enemies.length; i < len; i++) {
      enemies[i].showType();
    }
    
  },

  update: function() {
    this.control.update();
    this.physics.arcade.collide(this.hero , layer);
  },

  run: function() {
    console.log('Running level 3...');
    if(true){
      console.log('Starting level 4...');
    } else {
      console.log('Game over!');
    }
  }
};
