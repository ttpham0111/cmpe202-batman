Game.Level1 = function(game){

}


var map ;
var layer ;

var player ;
var controls  = {} ;
var playerSpeed = 150 ; 
 
var enemies  ; 
var bullets ; 
var bulletTime = 0 ; 
var fireButton ; 


var score = 0 ; 
var scoreText ; 
var winText ; 


Game.Level1.prototype = {
	preload : function(){
		//Load Enemy
		this.load.image('enemy','../assets/enemy.jpg')
		this.load.image('bullet','../assets/Bullet.jpg')
	},


	create : function(){
		


		

		// The enemy's bullets
	    bullets = this.add.group();
	    bullets.enableBody = true;
	    bullets.physicsBodyType = Phaser.Physics.ARCADE;
	    bullets.createMultiple(30, 'bullet');
	    bullets.setAll('anchor.x', 0.5);
	    bullets.setAll('anchor.y', 1);
	    bullets.setAll('outOfBoundsKill', true);
	    bullets.setAll('checkWorldBounds', true);


	  
	   enemies = this.add.group();
	   enemies.enableBody = true;
	   enemies.physicsBodyType = Phaser.Physics.ARCADE;



	   enemies2 = this.add.group();
	   enemies2.enableBody = true;
	   enemies2.physicsBodyType = Phaser.Physics.ARCADE;

	   enemies3 = this.add.group();
	   enemies3.enableBody = true;
	   enemies3.physicsBodyType = Phaser.Physics.ARCADE;

	   enemies4 = this.add.group();
	   enemies4.enableBody = true;
	   enemies4.physicsBodyType = Phaser.Physics.ARCADE;



	    this.createEnemies();











		//this.physics.arcade.gravity.y = 1400 ; 

		map = this.add.tilemap('map',32 , 32)
		

		map.addTilesetImage('tileset');
		

		layer = map.createLayer(0) ;
		layer.resizeWorld() ; 

		map.setCollisionBetween(1,1); 
		map.setTileIndexCallback(0 , this.resetPlayer , this );
		map.setTileIndexCallback(2 , this.getCoin , this );
		

		player = this.add.sprite(75 , 800 , 'player');
		player.anchor.setTo(0.5,0.5);
		
		



		player.animations.add('idle' , [0,1] , 1 , true);
		player.animations.add('jump' , [2] , 1 , true);
		player.animations.add('run' , [3,4,5,6,7,8,9] , 7 , true);
		this.physics.arcade.enable(player);
		this.camera.follow(player);

		player.body.collideWorldBounds = true ;

		controls = {
			right : this.input.keyboard.addKey(Phaser.Keyboard.D),
			left : this.input.keyboard.addKey(Phaser.Keyboard.A),
			up : this.input.keyboard.addKey(Phaser.Keyboard.W),
			down : this.input.keyboard.addKey(Phaser.Keyboard.S),
			fireButtonI : this.input.keyboard.addKey(Phaser.Keyboard.I),
			fireButtonJ : this.input.keyboard.addKey(Phaser.Keyboard.J),
			fireButtonK : this.input.keyboard.addKey(Phaser.Keyboard.K),
			fireButtonL : this.input.keyboard.addKey(Phaser.Keyboard.L),
		};

		
		scoreText = this.add.text(800,50,'Score' , {font : '32px Arial' , fill : '#fff'});
		winText = this.add.text(this.world.centerX , this.world.centerY , 'You Win!',  {font : '32px Arial' , fill : '#fff'} ) ; 
		winText.visible = false ; 

	},

	update : function(){
		this.physics.arcade.collide(player , layer);

		player.body.velocity.x = 0 ;
		player.body.velocity.y = 0 ;


		this.physics.arcade.overlap(bullets , enemies , this.collisionHandler , null , this) ; 
		this.physics.arcade.overlap(bullets , enemies2 , this.collisionHandler , null , this) ; 
		this.physics.arcade.overlap(bullets , enemies3 , this.collisionHandler , null , this) ; 
		this.physics.arcade.overlap(bullets , enemies4 , this.collisionHandler , null , this) ; 
		this.physics.arcade.overlap(player , enemies , this.collisionHandlerForPlayer , null , this) ; 
		this.physics.arcade.overlap(player , enemies2 , this.collisionHandlerForPlayer , null , this) ; 
		this.physics.arcade.overlap(player , enemies3 , this.collisionHandlerForPlayer , null , this) ; 
		this.physics.arcade.overlap(player , enemies4 , this.collisionHandlerForPlayer , null , this) ; 


		if(controls.up.isDown){
			player.animations.play('run');
			player.scale.setTo(1,1);
			player.body.velocity.y -= playerSpeed ;
		}

		if(controls.down.isDown){
			player.animations.play('run');
			player.scale.setTo(-1,1);
			player.body.velocity.y += playerSpeed ;
		}		
		

		if(controls.right.isDown){
			player.animations.play('run');
			player.scale.setTo(1,1);
			player.body.velocity.x += playerSpeed ;
		}

		if(controls.left.isDown){
			player.animations.play('run');
			player.scale.setTo(-1,1);
			player.body.velocity.x -= playerSpeed ;
		}		

		if(player.body.velocity.x == 0 && player.body.velocity.y ==0){
			player.animations.play('idle');
		}

		if(controls.fireButtonI.isDown){
				if(this.time.now > bulletTime){
				bullet = bullets.getFirstExists(false);

				if(bullet){
					bullet.reset(player.x , player.y);
					bullet.body.velocity.y = -200 ; 
					bulletTime = this.time.now + 1000 ; 
				}
			}
		}

		if(controls.fireButtonJ.isDown){
			if(this.time.now > bulletTime){
				bullet = bullets.getFirstExists(false);

				if(bullet){
					bullet.reset(player.x , player.y);
					bullet.body.velocity.x = -200 ; 
					bulletTime = this.time.now + 1000 ; 
				}
			}
		}

		if(controls.fireButtonK.isDown){
			if(this.time.now > bulletTime){
				bullet = bullets.getFirstExists(false);

				if(bullet){
					bullet.reset(player.x , player.y);
					bullet.body.velocity.y = +200 ; 
					bulletTime = this.time.now + 1000 ; 
				}
			}
		}

		if(controls.fireButtonL.isDown){
			if(this.time.now > bulletTime){
				bullet = bullets.getFirstExists(false);

				if(bullet){
					bullet.reset(player.x , player.y);
					bullet.body.velocity.x = +200 ; 
					bulletTime = this.time.now + 1000 ; 
				}
			}
		}


		scoreText.text = 'Score : ' + score ; 

		if(score == 8){
			winText.visible = true ; 
			scoreText.visible = false ; 
		}

	},

	resetPlayer: function(){
		player.reset(100 , 700 ); 
	},

	getCoin : function(){
		map.putTile(-1 , layer.getTileX(player.x), layer.getTileY(player.y)) ;
	},

	collisionHandler : function(bullet , enemy ){
		console.log('Collision handler called '); 
		bullet.kill();
		enemy.kill() ; 
		score ++ ; 
		console.log("Score " , score ) ; 
	},

	collisionHandlerForPlayer : function(player , enemy){
		this.resetPlayer() ; 
	},

	createEnemies : function(){
		var enemy = enemies.create(48 , 50 , 'enemy');
		enemy.anchor.setTo(0.5,0.5);

		var enemy2 = enemies.create(48 , 48 , 'enemy');
		enemy2.anchor.setTo(0.5,0.5);


		var enemy3 = enemies2.create(48 , 50 , 'enemy');
		enemy3.anchor.setTo(0.5,0.5);

		var enemy4 = enemies2.create(48 , 48 , 'enemy');
		enemy4.anchor.setTo(0.5,0.5);


		var enemy5 = enemies3.create(48 , 50 , 'enemy');
		enemy5.anchor.setTo(0.5,0.5);

		var enemy6 = enemies3.create(48 , 48 , 'enemy');
		enemy6.anchor.setTo(0.5,0.5);

		var enemy7 = enemies4.create(48 , 50 , 'enemy');
		enemy7.anchor.setTo(0.5,0.5);

		var enemy8 = enemies4.create(48 , 48 , 'enemy');
		enemy8.anchor.setTo(0.5,0.5);



		enemies.x = 600;
		enemies.y = 650 ;

		enemies2.x = 300;
		enemies2.y = 400 ;

		enemies3.x = 600;
		enemies3.y = 100 ;

		enemies4.x = 25;
		enemies4.y = 10 ;


		var tween2 = this.add.tween(enemy2).to({x : 200 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween2.onLoop.add(this.descend , this);
		var tween4 = this.add.tween(enemy4).to({x : 200 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween4.onLoop.add(this.descend , this);
		var tween6 = this.add.tween(enemy6).to({x : 200 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween6.onLoop.add(this.descend , this);
		var tween8 = this.add.tween(enemy8).to({x : 200 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween8.onLoop.add(this.descend , this);


		var tween = this.add.tween(enemy).to({y : 200 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween.onLoop.add(this.descend , this);
		var tween3 = this.add.tween(enemy3).to({y : 200 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween3.onLoop.add(this.descend , this);
		var tween5 = this.add.tween(enemy5).to({y : 200 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween5.onLoop.add(this.descend , this);
		var tween7 = this.add.tween(enemy7).to({y : 200 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween7.onLoop.add(this.descend , this);
	},

	descend : function(){
		enemies.y =+ 10 ; 
	},
	
	


}; 