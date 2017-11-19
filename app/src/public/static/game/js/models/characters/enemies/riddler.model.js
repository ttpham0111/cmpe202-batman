class Riddler extends Enemy {
  constructor(game, x, y, group, initialStats) {
    initialStats = initialStats || {
      name: 'Riddler',
      maxHealth: 10,
      strength: 1,
      speed: 100
    };
    super(game, x, y, Game.ENEMY_RIDDLER_KEY, group, initialStats);

  }

  collidedWith(hero){
  	
  	this.giveRiddle(hero);
  }

  giveRiddle(hero){
	 // 	window.prompt("sometext","defaultText");
	 	var txt;
	  	var answer = prompt("what is the design pattern that is used when creation of object directly is costly", "?");
		if(answer == "prototype"){
			alert("You got the right answer!");
			this.kill();
			console.log("correct answer");
		}else
		{
			alert("Wrong! try again next time");
		}
		
  		//update score or list 
	}
}
