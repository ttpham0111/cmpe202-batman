Game.Preloader = function(game){
	this.preloadBar  =  null 
} ;


Game.Preloader.prototype = {
	preload : function(){
		this.preloadBar = this.add.sprite(this.world.centerX, 
											this.world.centerY , 'preloaderBar');

		this.preloadBar.anchor.setTo(0.5 , 0.5);
		this.time.advancedTiming = true ; 

		this.load.setPreloadSprite(this.preloadBar);


		//Load All assets

		this.load.tilemap('map', '../assets/GameTile.csv');
		this.load.image('tileset' , '../assets/tileImage.jpg');


		//this.load.image('drag' , '../assets/apple.jpg')

		// Load Player
		this.load.spritesheet('player' , '../assets/Player.png' , 24 , 26 )

		
		//Load Enemy
		this.load.image('enemy','../assets/enemy.jpg')
		this.load.image('enemyBullet','../assets/Bullet.jpg')

		

	},

	create : function(){
		this.state.start('Level1') ;
	}
}