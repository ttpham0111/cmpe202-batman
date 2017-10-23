Game.Level1 = function(game){

}


var map ;
var layer ;

var player ;
var controls  = {} ;
var playerSpeed = 150 ; 
var jumpTimer  = 0 ; 
var drag  ; 

Game.Level1.prototype = {
	create : function(){
		


		//this.physics.arcade.gravity.y = 1400 ; 

		map = this.add.tilemap('map',64 , 64)
		map.addTilesetImage('tileset');
		map.addTilesetImage('coinset');
		layer = map.createLayer(0) ;
		layer.resizeWorld() ; 

		map.setCollisionBetween(0,0); 
		map.setTileIndexCallback(23 , this.resetPlayer , this );
		map.setTileIndexCallback(0 , this.getCoin , this )
		

		player = this.add.sprite(100 , 500 , 'player');
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
		};

		drag = this.add.sprite(player.x , player.y,'drag');
		drag.anchor.setTo(0.5 , 0.5);
		drag.inputEnabled = true ;
		drag.input.enableDrag(true) ; 

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



	},

	resetPlayer: function(){
		player.reset(100 , 560 ); 
	},

	getCoin : function(){
		map.putTile(-1 , layer.getTileX(player.x), layer.getTileY(player.y))
	}

}; 