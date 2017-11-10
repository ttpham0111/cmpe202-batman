function Factory() {
    this.createEnemies = function (type) {
        var Enemy;
 
        if (type === "ivy") {
            Enemy = new ivy();
        } else if (type === "joker") {
            Enemy = new joker();
        } else if (type === "scarecrow") {
            Enemy = new scarecrow();
        } else if (type === "Freeze") {
            Enemy = new Freeze();
        } else if  (type === "riddler") {
            Enemy = new riddler();
        }
 
        Enemy.type = type;
 
        Enemy.showType = function () {
            
     //       alert("my type is: "+ this.type); 
          console.log("my type is: "+ this.type); 
        }
 
        return Enemy;
    }
}


var ivy = function () {
    this.name = "ivy";
    this.skill = "poison";
    var ivyImage;
    ivyImage = game.add.sprite(400 , 200 , 'ivy');
    ivyImage.scale.setTo(0.08, 0.08);
};
 
var joker = function () {
    this.name = "joker";
    this.skill = "bomb";
};
 
var scarecrow = function () {
    this.name = "scarecrow";
    this.skill = "scare";
};
 
var Freeze = function () {
    this.name = "Mr. Freeze";
    this.skill = "freeze you";
};

var riddler = function () {
    this.name = "riddler";
    this.skill = "give a riddle";
    var riddlerImage;
    riddlerImage = game.add.sprite(400 , 400 , 'riddler');
    riddlerImage.scale.setTo(0.15, 0.15);
};



