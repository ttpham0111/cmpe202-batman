Game.Level1 = function(context) {
  this.context = context;
};

var map;
var layer;

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
    this.control = new KeyboardController({
      hero: this.hero,
      input: this.input.keyboard
    });
    //showing guide modal
    this.context.modalText = "Press 'Run' to get the character moving!"
    this.context.showModal = true;
    self = this;
    this.context.closeModal = function(){
      self.context.showModal = false;
      self.showAnimatedUpArrow();
    }
  },

  showAnimatedUpArrow: function(){
    var cmContainer = document.getElementsByClassName("CodeMirror-container")[0];
    var btnContainer = cmContainer.getElementsByClassName("btn-container")[0];
    var imgElement = document.createElement("img");
    imgElement.className = 'up-arrow';
    imgElement.id = 'animatedUpArrow';
    imgElement.src = 'public/static/game/assets/up.png';
    btnContainer.appendChild(imgElement);
  },

  update: function() {
    this.control.update();
    this.physics.arcade.collide(this.hero , layer);
  },

  onClickRun: function() {
    console.log('Running level 1...');
    var child = document.getElementById('animatedUpArrow');
    child.parentNode.removeChild(child);
    if(true){
      console.log('Starting level 2...');
    } else {
      console.log('Game over!');
    }
  }
};
