var game = new Phaser.Game(1000, 800, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

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
    game.load.tilemap('map', 'assets/Test.csv', null, Phaser.Tilemap.CSV);

    //  Next we load the tileset. This is just an image, loaded in via the normal way we load images:

    game.load.image('tiles', 'assets/Town_Objects.png');

    game.load.image("background", "assets/Town_Background.png");

    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}

var map;
var layer;
var player;
var cursors;

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

    player = game.add.sprite(60, 60, 'dude');
    //   player = game.add.sprite(50,60,'batman');
    //   player.scale.setTo(0.1, 0.1);
    player.anchor.setTo(0.5);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.bounce.x = 0.5;
    player.body.bounce.y = 0.5;

    cursors = game.input.keyboard.createCursorKeys();


}


function update() {


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