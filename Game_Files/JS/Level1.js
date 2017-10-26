Game.Level1 = function(game){

}


var map ;
var layer ;

var player ;
var controls  = {} ;
var playerSpeed = 150 ; 
 
var enemy  ; 
var bullets ; 
var bulletTime = 0 ; 
var fireButton ; 

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


	  
















		//this.physics.arcade.gravity.y = 1400 ; 

		map = this.add.tilemap('map',32 , 32)
		

		map.addTilesetImage('tileset');
		

		layer = map.createLayer(0) ;
		layer.resizeWorld() ; 

		map.setCollisionBetween(1,1); 
		map.setTileIndexCallback(0 , this.resetPlayer , this );
		map.setTileIndexCallback(2 , this.getCoin , this );
		

		player = this.add.sprite(100 , 400 , 'player');
		player.anchor.setTo(0.5,0.5);
		enemy  = this.add.sprite(600,850,'enemy') ; 
		enemy.anchor.setTo(0.5,0.5);		

		



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

		
		
		

	},

	update : function(){
		this.physics.arcade.collide(player , layer);

		player.body.velocity.x = 0 ;
		player.body.velocity.y = 0 ;

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
					bullet.body.velocity.y = -300 ; 
					bulletTime = this.time.now + 200 ; 
				}
			}
		}

		if(controls.fireButtonJ.isDown){
			if(this.time.now > bulletTime){
				bullet = bullets.getFirstExists(false);

				if(bullet){
					bullet.reset(player.x , player.y);
					bullet.body.velocity.x = -300 ; 
					bulletTime = this.time.now + 200 ; 
				}
			}
		}

		if(controls.fireButtonK.isDown){
			if(this.time.now > bulletTime){
				bullet = bullets.getFirstExists(false);

				if(bullet){
					bullet.reset(player.x , player.y);
					bullet.body.velocity.y = +300 ; 
					bulletTime = this.time.now + 200 ; 
				}
			}
		}

		if(controls.fireButtonL.isDown){
			if(this.time.now > bulletTime){
				bullet = bullets.getFirstExists(false);

				if(bullet){
					bullet.reset(player.x , player.y);
					bullet.body.velocity.x = +300 ; 
					bulletTime = this.time.now + 200 ; 
				}
			}
		}



	},

	resetPlayer: function(){
		player.reset(100 , 700 ); 
	},

	getCoin : function(){
		map.putTile(-1 , layer.getTileX(player.x), layer.getTileY(player.y))
	},

	
	


}; 