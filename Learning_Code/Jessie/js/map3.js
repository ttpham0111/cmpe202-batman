
var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render });

function preload() {
    
    game.load.image('sky', 'assets/sky.png');
    game.load.tilemap('mymap1', 'assets/Layer1.csv', 'test.csv', Phaser.Tilemap.CSV);
    game.load.tilemap('mymap2', 'assets/Layer2.csv', 'test.csv', Phaser.Tilemap.CSV);
    game.load.tilemap('mymap3', 'assets/Layer3.csv', 'test.csv', Phaser.Tilemap.CSV);
//    game.load.image('tiles', 'assets/town.png');
    game.load.image('tiles1', 'assets/town.png');
    game.load.image('tiles2', 'trees_plants_rocks.png');
    game.load.spritesheet('player', 'assets/dude.png', 16, 16);

}

var map;
var layer;
var cursors;
var player;

function create() {

    //  Because we're loading CSV map data we have to specify the tile size here or we can't render it
  //  map = game.add.tilemap('mymap1', 64, 64);
 //   map = game.add.tilemap('mymap2',128, 128);
    map = game.add.tilemap('mymap1', 32, 32);
   
    //  Now add in the tileset
    map.addTilesetImage('tiles1');
    map.addTilesetImage('tiles2');
    
    //  Create our layer
    layer = map.createLayer(0);

    //  Resize the world
    layer.resizeWorld();

    //  This isn't totally accurate, but it'll do for now
    map.setCollisionBetween(54, 83);

    //  Un-comment this on to see the collision tiles
    // layer.debug = true;
/*
    //  Player
    player = game.add.sprite(48, 48, 'player', 1);
    player.animations.add('left', [8,9], 10, true);
    player.animations.add('right', [1,2], 10, true);
    player.animations.add('up', [11,12,13], 10, true);
    player.animations.add('down', [4,5,6], 10, true);

    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.setSize(10, 14, 2, 1);

    game.camera.follow(player);*/

    cursors = game.input.keyboard.createCursorKeys();

    var help = game.add.text(16, 16, 'Arrows to move', { font: '14px Arial', fill: '#ffffff' });
    help.fixedToCamera = true;

}

function update() {
/*
    game.physics.arcade.collide(player, layer);

    player.body.velocity.set(0);

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -100;
        player.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 100;
        player.play('right');
    }
    else if (cursors.up.isDown)
    {
        player.body.velocity.y = -100;
        player.play('up');
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 100;
        player.play('down');
    }
    else
    {
        player.animations.stop();
    }
*/
}

function render() {

    // game.debug.body(player);

}