const shoot = function(hero) {
  this._hero = hero;
};


const bulletTime = 0 ;

shoot.prototype.getName  =  function(){return 'shoot'}

shoot.prototype.perform = function(bullets , game ){
	console.log("Shooting") ; 
	const hero = this._hero ; 
	if(game.time.now > bulletTime){
				bullet = bullets.getFirstExists(false);

				if(bullet){
					bullet.reset(hero.x , hero.y);
					bullet.body.velocity.x = +200 ; 
					bulletTime = this.time.now + 1000 ; 
				}
			}


}

