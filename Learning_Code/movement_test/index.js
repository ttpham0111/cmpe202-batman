
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload () {

    game.load.spritesheet('player', 'player1.png', 64, 64);
    
}

var player;
var cursors;
var isMoving;
var direction;
var directions = ['right','down','left','up'];

function create () {

    game.physics.startSystem(Phaser.Physics.ARCADE);  

    game.stage.backgroundColor = "#eee";

    player = game.add.sprite(32, 32, 'player', 27);

    game.physics.arcade.enable(player);

    player.anchor.setTo(0.5);
    
    isMoving = false;
    direction = directions[0];

    player.animations.add('up', [1, 2, 3, 4, 5, 6, 7, 8], 10, true);
    player.animations.add('left', [10, 11, 12, 13, 14, 15, 16, 17], 10, true);
    player.animations.add('down', [19, 20, 21, 22, 23, 24, 25, 26], 10, true);
    player.animations.add('right', [28, 29, 30, 31, 32, 33, 34, 35], 10, true);

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
            player.frame = 9;
        } else if(direction === 'right'){
            new_pos = { x: player.position.x+(32*steps), y: player.position.y };
            player.frame = 27;
        } else if(direction === 'up'){
            new_pos = { x: player.position.x, y: player.position.y-(32*steps) };
            player.frame = 0;
        } else {
            new_pos = { x: player.position.x, y: player.position.y+(32*steps) };
            player.frame = 18;
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
        if(direction === 'left'){
            player.animations.play('left');
        } else if(direction === 'right'){
            player.animations.play('right');
        } else if(direction === 'up'){
            player.animations.play('up');
        } else {
            player.animations.play('down');
        }
    } else {
        if(direction === 'left'){
            player.frame = 9;
        } else if(direction === 'right'){
            player.frame = 27;
        } else if(direction === 'up'){
            player.frame = 0;
        } else {
            player.frame = 18;
        }
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
