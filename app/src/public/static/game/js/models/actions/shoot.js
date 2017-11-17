var hero ; 
const shoot = function(hero1) {
	console.log("Initiating Hero") ;
  hero = hero1;
  console.log(hero.x) ;
};

var bulletTime = 0 ;
var time ;
var bullets ;
var direction ; 

shoot.prototype.getName  =  function(){return 'shoot'}

shoot.prototype.perform = function(time1 , bullets1 , direction ){
	
	console.log("Shooting " , direction);
	time = time1 ; 
	bullets = bullets1 ; 
	new ObjectHandler().startHandler(direction) ; 
}



//CHain of Responsibility
var Handler = function(direction , velocityDirection , speed ) {
    this.direction = direction;
    this.next = null;
    this.velocityDirection = velocityDirection ;
    this.speed = speed 
}

Handler.prototype = {
	handleDirection : function(direction){
		if(this.direction == direction){
			if(time > bulletTime){
		        bullet = bullets.getFirstExists(false);

		        if(bullet){
		          
		          bullet.reset(hero.x+50 , hero.y+50);
		          if(this.direction == 'right'){
		          	bullet.body.velocity.x = +200 ; 
		          }else if(this.direction == 'up'){
		          	bullet.body.velocity.y = -200 ; 
		          }else if(this.direction == 'down'){
		          	bullet.body.velocity.y = +200 ; 
		          }else if(this.direction == 'left'){
		          	bullet.body.velocity.x = -200 ; 
		          }
				  bulletTime = time + 1000 ; 
		        }
		      }
		}else{
			this.next.handleDirection(direction) ; 
		}
	},

	setSuccessor : function(handler){
		this.next = handler ; 
	}
}


var ObjectHandler = function(){
	var rightHandler = new Handler('right' , 'x' , "+200" );
	var leftHandler = new Handler('left' , 'x' , "-200" );
	var upHandler = new Handler('up' , 'y' , "-200" );
	var downHandler = new Handler('down' , 'y' , "+200" );

	rightHandler.setSuccessor(leftHandler);
	leftHandler.setSuccessor(upHandler);
	upHandler.setSuccessor(downHandler);

	this.startObjectHandler = rightHandler ; 
}


ObjectHandler.prototype.startHandler = function(direction){
	this.startObjectHandler.handleDirection(direction) ; 
}