
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {

    game.load.image('player', 'player.gif');
    
}

var player;
var cursors;
var isMoving;

function create () {

    game.physics.startSystem(Phaser.Physics.ARCADE);  

    game.stage.backgroundColor = "#eee";

    player = game.add.image(game.world.centerX, game.world.centerY, 'player');

    player.width = 50;
    player.height = 50;

    game.physics.arcade.enable(player);

    isMoving = false;

    player.animations.add('player_walk');

    //game.input.onDown.add(moveCharacter, this);

    //cursors = game.input.keyboard.createCursorKeys();

}

function moveCharacter(pointer){
    console.log("moving...");
    isMoving = true;
    var duration = (game.physics.arcade.distanceToPointer(player, pointer) / 300) * 1000;
    tween = game.add.tween(player).to({ x: pointer.x, y: pointer.y }, duration, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(moveCharacterComplete, this);
}

function moveCharacterComplete(){
    isMoving = false;
    player.animations.stop();
}

function update () {
    if (isMoving) {
        // play sprite at 12 frames per second
        player.animations.play('player_walk', 12, true);
    } else {
        player.animations.stop();
    }
    if (game.input.activePointer.isDown)
    {
        moveCharacter(game.input.activePointer);
    }
}
