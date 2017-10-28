// test game
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var box = function(options) {
	var bmd = game.add.bitmapData(options.length, options.width);
	bmd.ctx.beginPath();
	bmd.ctx.rect(0,0,options.length, options.width);
	bmd.ctx.fillStyle = options.color;
	bmd.ctx.fill();
	return bmd;
}

function preload() {
    
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.image('batman','assets/batman1.jpg');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  
}

var player;
var cursors;
var stars;
var score = 0;
var scoreText;

var walls;
var outWalls;
var roomSize = 400;
var topLeft = 23;

function create() {
  
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // game.add.sprite(0, 0, 'sky');
    sky= game.add.sprite(0,0,'sky');   
    
     // The player and its setting 
    player = game.add.sprite(60,60,'dude');
 //   player = game.add.sprite(50,60,'batman');
 //   player.scale.setTo(0.1, 0.1);
    player.anchor.setTo(0.5);
    game.physics.arcade.enable(player);
    //??? not working
    game.world.setBounds(5,5,roomSize,roomSize);
    player.body.collideWorldBounds = true;
    player.body.bounce.x = 0.5;
    player.body.bounce.y = 0.5; 

    /*
    bar3 = game.add.sprite(180,300,'ground');
    bar3.scale.setTo(0.5,1);
    */
    var graphics = game.add.graphics(10, 10);    
    
    walls = game.add.group();
    walls.enableBody = true;
    for (var i = 1; i < 5; i++)
    {
        var bar = walls.create((i%2+1)*90, i*90,'ground');
        bar.scale.setTo(0.5,1);
        bar.body.immovable = true;
      
    }
	
	  outWalls= game.add.group();
		outWalls.enableBody = true;
		var topWall = outWalls.create(topLeft+5,topLeft+5, box({length: roomSize, width: 16, color: '#374A59'}));
		topWall.body.immovable = true;
		var bottomWall = outWalls.create(topLeft+5,topLeft+10+roomSize, box({length: roomSize, width: 16, color: '#374A59'}));
		bottomWall.body.immovable = true;
		var leftWall = outWalls.create(topLeft+5,topLeft+12, box({length: 16, width: roomSize, color: '#374A59'}));
		leftWall.body.immovable = true;
		var rightWall = outWalls.create(topLeft+roomSize-11,topLeft+12, box({length: 16, width: roomSize, color: '#374A59'}));
		rightWall.body.immovable = true;
   
     // draw a rectangle
  /*  graphics.lineStyle(3, 0x374A59, 1);
    graphics.drawRect(topLeft, topLeft, roomSize, roomSize); 
	*/
     
    graphics.lineStyle(3, 0x374A59, 1);
    graphics.drawRect(topLeft*5 + roomSize, topLeft, roomSize/2, roomSize);
          
    // draw a circle
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF0B, 0.5);
    graphics.drawCircle(460, 50, 20);
    graphics.endFill();

    window.graphics = graphics;
  
    //collecctible objects
    stars = game.add.group();

    //Enable physics for any star that is created in this group
    stars.enableBody = true;
   
    for (i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(topLeft*5 + (i%3) * 100, topLeft*2 + Math.floor(i/3)*90, 'star');
                
    }

    //  display score
    scoreText = game.add.text(5, 3, 'Score: 0', { fontSize: '20px', fill: '#000' });
    label1 = game.add.text(topLeft*5 + 10 + roomSize, 3, 'type your code', { fontSize: '20px', fill: '#000' });
  
    cursors = game.input.keyboard.createCursorKeys();
  
}

function update() {
    //initial velocity
	  player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if(score>=120){
       scoreText.text = 'You won!!!';
    }
   
    game.physics.arcade.collide(player, walls);
	
	  game.physics.arcade.collide(player, outWalls);
  
    
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
  
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 200;
    }

    if (cursors.up.isDown)
    {
        player.body.velocity.y = -200;
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 200;
    }
}

function collectStar (player, star) {
    
    //Removes the star from the screen
    star.kill();

    //update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}
