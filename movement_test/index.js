
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {

    game.load.image('player', 'player.gif');
    
}

var player;
var cursors;

function create () {

    game.physics.startSystem(Phaser.Physics.ARCADE);  

    game.stage.backgroundColor = "#eee";

    player = game.add.image(game.world.centerX, game.world.centerY, 'player');

    player.width = 50;
    player.height = 50;

    game.physics.arcade.enable(player);

    player.animations.add('step', null, 10, true);
    player.animations.add('left', null, 10, true);
    player.animations.add('right', null, 10, true);

    cursors = game.input.keyboard.createCursorKeys();

}

function update () {

    if (cursors.left.isDown){
        player.animations.play('left');
    } else if (cursors.right.isDown) {
        player.animations.play('right');
    } else if (cursors.up.isDown) {
        player.animations.play('step');
    }

}
