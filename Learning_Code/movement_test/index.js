
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload () {

    game.load.image('player', 'player.gif');
    
}

var player;
var cursors;
var isMoving;
var direction;
var directions = ['right','down','left','up'];

function create () {

    game.physics.startSystem(Phaser.Physics.ARCADE);  

    game.stage.backgroundColor = "#eee";

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');

    game.physics.arcade.enable(player);

    player.width = 50;
    player.height = 50;

    player.anchor.setTo(0.5,0.5);
    
    isMoving = false;
    direction = directions[0];

    player.animations.add('player_walk');

    //cursors = game.input.keyboard.createCursorKeys();

    game.input.keyboard.onUpCallback = function(e){
        if(e.keyCode === Phaser.Keyboard.LEFT){
            direction = directions.indexOf(direction) === 0 ? directions[directions.length-1]:directions[directions.indexOf(direction)-1];
        } else if(e.keyCode === Phaser.Keyboard.RIGHT){
            direction = directions.indexOf(direction) === directions.length-1 ? directions[0]:directions[directions.indexOf(direction)+1];
        }
    }

}

function moveCharacter(steps){
    if(!isMoving) {
        var new_pos;
        if(direction === 'left'){
            new_pos = { x: player.position.x-(32*steps), y: player.position.y };
        } else if(direction === 'right'){
            new_pos = { x: player.position.x+(32*steps), y: player.position.y };
        } else if(direction === 'up'){
            new_pos = { x: player.position.x, y: player.position.y-(32*steps) };
        } else {
            new_pos = { x: player.position.x, y: player.position.y+(32*steps) };
        }
        isMoving = true;
        tween = game.add.tween(player).to(new_pos, 300, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(moveCharacterComplete, this);
    }
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
        moveCharacter(1);
    }
}

function render() {

    game.debug.spriteInfo(player, 32, 32);

}
