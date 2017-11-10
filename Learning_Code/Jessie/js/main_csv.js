var game = new Phaser.Game(800, 800, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    //  Tilemaps are split into two parts: The actual map data (usually stored in a CSV or JSON file) 
    //  and the tileset/s used to render the map.

    //  Here we'll load the tilemap data. The first parameter is a unique key for the map data.

    //  The second is a URL to the JSON file the map data is stored in. This is actually optional, you can pass the JSON object as the 3rd
    //  parameter if you already have it loaded (maybe via a 3rd party source or pre-generated). In which case pass 'null' as the URL and
    //  the JSON object as the 3rd parameter.

    //  The final one tells Phaser the foramt of the map data, in this case it's a JSON file exported from the Tiled map editor.
    //  This could be Phaser.Tilemap.CSV too.

    //  game.load.tilemap('map1', 'assets/Room.json', null, Phaser.Tilemap.TILED_JSON);
//    game.load.tilemap('map', 'assets/Test.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('map', 'assets/Room_Theme/Room.csv', null, Phaser.Tilemap.CSV);
    
    
    //  Next we load the tileset. This is just an image, loaded in via the normal way we load images:
  //  game.load.image('tiles', 'assets/Town_Objects.png');
    game.load.image('tiles', 'assets/Room_Theme/Room.jpg');
    

 //   game.load.image("background", "assets/Town_Background.png");
    game.load.image("background", "assets/Room_Theme/Room_Background.png");
    
 //   game.load.spritesheet('player','assets/player.png', 32, 48);
    game.load.image('player','assets/player.png', 32, 48);
    game.load.image("ivy", "assets/enemies/ivy.png");
    game.load.image("riddler", "assets/enemies/riddler.png");

}

var map;
var layer;
var player;
var score;
var cursors;
var enemy;
var enemies = [];

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  game.stage.backgroundColor = '#787878';

    //  The 'mario' key here is the Loader key given in game.load.tilemap
    //    map = game.add.tilemap('map1');

    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    //    map.addTilesetImage('Room', 'tiles');

    game.add.tileSprite(0, 0, 640, 640, 'background');
    map = game.add.tilemap('map');

    //  Now add in the tileset
    map.addTilesetImage('tiles');


    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.

    layer = map.createLayer(0);
    //  This resizes the game world to match the layer dimensions


    layer.resizeWorld();


    map.setCollisionBetween(0, 500);
    map.setCollision([155, 135], false);
   
   
	player = game.add.sprite(100 , 100 , 'player');
    player.scale.setTo(0.2, 0.2);
	player.anchor.set(0.5);
	game.physics.enable(player);
//	player.body.collideWorldBounds = true ;
    game.camera.follow(player);
    
  //  enemy = game.add.sprite(300 , 200 , 'ivy');
  //  enemy.scale.setTo(0.08, 0.08);
    
    
    var factory = new Factory();
    enemies.push(factory.createEnemies("ivy"));
    enemies.push(factory.createEnemies("joker"));
    enemies.push(factory.createEnemies("riddler"));
    enemies.push(factory.createEnemies("Freeze"));
    enemies.push(factory.createEnemies("scarecrow"));
    
    
    for (var i = 0, len = enemies.length; i < len; i++) {
        enemies[i].showType();
    }

    cursors = game.input.keyboard.createCursorKeys();

}


function update() {


    game.physics.arcade.collide(player, layer);
    
    for (var i = 0, len = enemies.length; i < len; i++) {
        enemy =  enemies[i];
        game.physics.arcade.overlap(player, enemy, detection, null, this);
    }
    
    //initial velocity
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
	
    if (cursors.left.isDown) {
        player.body.velocity.x = -200;
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 200;
    }

    if (cursors.up.isDown) {
        player.body.velocity.y = -200;
    }
    else if (cursors.down.isDown) {
        player.body.velocity.y = 200;
    }

}

function Factory() {
    this.createEnemies = function (type) {
        var Enemy;
 
        if (type === "ivy") {
            Enemy = new ivy();
        } else if (type === "joker") {
            Enemy = new joker();
        } else if (type === "scarecrow") {
            Enemy = new scarecrow();
        } else if (type === "Freeze") {
            Enemy = new Freeze();
        } else if  (type === "riddler") {
            Enemy = new riddler();
        }
 
        Enemy.type = type;
 
        Enemy.showType = function () {
            
     //       alert("my type is: "+ this.type); 
          console.log("my type is: "+ this.type); 
        }
 
        return Enemy;
    }
}


var ivy = function () {
    this.name = "ivy";
    this.skill = "poison";
    var ivyImage;
    ivyImage = game.add.sprite(400 , 200 , 'ivy');
    ivyImage.scale.setTo(0.08, 0.08);
};
 
var joker = function () {
    this.name = "joker";
    this.skill = "bomb";
};
 
var scarecrow = function () {
    this.name = "scarecrow";
    this.skill = "scare";
};
 
var Freeze = function () {
    this.name = "Mr. Freeze";
    this.skill = "freeze you";
};

var riddler = function () {
    this.name = "riddler";
    this.skill = "give a riddle";
    var riddlerImage;
    riddlerImage = game.add.sprite(400 , 400 , 'riddler');
    riddlerImage.scale.setTo(0.15, 0.15);
};


function detection (player, enemy) {
    
    
    if(enemy.type === "riddler") {
        
       alert("what is the design pattern that is used when creation of object directly is costly") ; 
        
    }else if(type === "Freeze") {
        
        
    }
    
    //Removes the star from the screen
    if(true){
        enemy.kill();
         //update the score
        score += 10;
        console.log("Score: " , score ) ; 
      //  scoreText.text = 'Score: ' + score;
    }
}

