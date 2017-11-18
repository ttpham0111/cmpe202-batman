Game.Level1 = function(editor) {
  this._editor = editor;
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
    tilemap.setCollision([155, 135], false);

    this._objectsLayer = tilemap.createLayer(0);
    this._objectsLayer.resizeWorld();

    this._hero = new Hero(this.game, 0, 0);
    this._hero.faceRight();

    new Gun(this.game).equip(this._hero);

    this._goon1 = this._enemyFactory.create(this._enemyFactory.types.GOON, 450, 300);

    // this._control = new KeyboardController({
    //   hero: this._hero,
    //   input: this.input.keyboard
    // });

    this._control = new EditorController({
      hero: this._hero,
      input: this._editor
    });
  },

  update: function() {
    this._control.update();
    const physics = this.physics.arcade;
    physics.collide(this._hero , this._objectsLayer, () => { this._hero.stop(); });
    physics.collide(this._hero , this._goon1, () => { this._hero.stop(); });
  },

  run: function() {
    this._control.update(true).then(() => {
      if (this._complete()) this.state.start(Game.states.LEVEL_2);
    });
  },

  _complete: function() {
    const epsilon = 25;
    return (Math.abs(475 - this._hero.x) < epsilon) && (Math.abs(260 - this._hero.y) < epsilon);
  }
};
