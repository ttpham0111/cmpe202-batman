const KeyboardController = function(context) {
  this._hero = context.hero;
  this._keyboard = context.input;
  this._cursors = this._keyboard.createCursorKeys();
  this.bullets = context.bullets;
  this.game = context.game 

  controls = {
      fireButtonQ : this._keyboard.addKey(Phaser.Keyboard.Q),
    };

};


var bulletTime = 0 ;

KeyboardController.prototype.update = function() {
  const cursors = this._cursors;
  const hero = this._hero;
  const bullets = this.bullets; 
  const game =  this.game ; 
  

  if(cursors.right.isDown && controls.fireButtonQ.isDown){
     hero.getAction('shoot').perform(game.time.now , bullets , 'right');
  }else if(cursors.up.isDown && controls.fireButtonQ.isDown){
     hero.getAction('shoot').perform(game.time.now , bullets , 'up');
  }else if(cursors.down.isDown &&  controls.fireButtonQ.isDown){
    hero.getAction('shoot').perform(game.time.now , bullets , 'down');
  }else if(cursors.left.isDown && controls.fireButtonQ.isDown){
    hero.getAction('shoot').perform(game.time.now , bullets , 'left');
  }
  else if (cursors.up.isDown) {
    hero.getAction('moveUp').perform();
  }
  else if (cursors.right.isDown) {
    hero.getAction('moveRight').perform();
  }
  else if (cursors.down.isDown) {
    hero.getAction('moveDown').perform();
  }
  else if (cursors.left.isDown) {
    hero.getAction('moveLeft').perform();
  }else if(controls.fireButtonQ.isDown){
    hero.getAction('shoot').perform(game.time.now , bullets , 'right');
  }else {
    hero.stop();
  }
};
