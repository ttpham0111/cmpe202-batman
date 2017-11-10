const shoot = function(hero) {
  this._hero = hero;
};




shoot.prototype.getName  =  function(){return 'shoot'}

shoot.prototype.perform = function(){
	console.log("Shooting") ; 
}

