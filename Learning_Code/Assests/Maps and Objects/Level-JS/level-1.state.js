Game.Level1 = function(editor) {
  this._editor = editor;
  this.showTutorial = true;
};

Game.Level1.prototype = {
  init: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this._enemyFactory = new EnemyFactory(this.game);
  },

  create: function() {
    this.add.tileSprite(0, 0, Game.WIDTH, Game.HEIGHT, Game.level1.TILESPRITE_KEY);

    const tilemap = this.add.tilemap(Game.level1.TILEMAP_KEY);
    tilemap.addTilesetImage(Game.level1.TILESET_IMAGE_KEY);
    tilemap.setCollisionBetween(0, 500);
    tilemap.setCollision([149, 150], false);

    this._objectsLayer = tilemap.createLayer(0);
    this._objectsLayer.resizeWorld();

    this._hero = new Hero(this.game, 0, 0);
    this._hero.faceRight();

    this._hero.equip(new Gun(this.game));

    this._enemies_to_kill = this.game.add.group();
    this._goon_group = this._enemyFactory.create(this._enemyFactory.types.GOON, 450, 300,1);
    this._riddler_group = this._enemyFactory.create(this._enemyFactory.types.RIDDLER, 200, 300,1);
    this._enemies_to_kill.add(this._goon_group);
   // this._enemies_to_kill.add(this._riddler_group);


    this._control = new KeyboardController({
      hero: this._hero,
      input: this.input.keyboard
    });

    // this._control = new EditorController({
    //   hero: this._hero,
    //   input: this._editor
    // });
  },

  update: function() {
    this._control.update();
    const physics = this.physics.arcade;
    physics.collide(this._hero , this._objectsLayer);

    physics.collide(this._hero , this._goon_group);
    physics.collide(this._hero , this._riddler_group, (hero, riddler) => { 
      hero.stop();
      riddler.collidedWith(hero);
    });

    this._checkComplete();

  },
/*
  physics.collide(..., ..., () => {});
  physics.collide(..., ..., function() {});

  function test() {};

  physics.collide(arg1, arg2, test);

  function collide(.., onCollision) {
    if (collided) onCollision(arg1, arg2[collidedWith])
  }
*/

  run: function() {
    this._control.update(true).then(() => {
      this._checkComplete();
    });
  },

  _checkComplete: function() {
    if (this._complete()) this.state.start(Game.states.LEVEL_2);
  },

  _complete: function() {
    const epsilon = 25;
    return (Math.abs(475 - this._hero.x) < epsilon) && (Math.abs(260 - this._hero.y) < epsilon);
  }
};
