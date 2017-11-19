Game.Level2 = function(editor) {
  this._editor = editor;
};

Game.Level2.prototype = {
  init: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this._enemyFactory = new EnemyFactory(this.game);
  },

  create: function() {
    this.add.tileSprite(0, 0, Game.WIDTH, Game.HEIGHT, Game.level2.TILESPRITE_KEY);

    const tilemap = this.add.tilemap(Game.level2.TILEMAP_KEY);
    tilemap.addTilesetImage(Game.level2.TILESET_IMAGE_KEY);
    tilemap.setCollisionBetween(0, 500);

    this._objectsLayer = tilemap.createLayer(0);
    this._objectsLayer.resizeWorld();

    this._hero = new Hero(this.game, 0, 480);
    this._hero.faceRight();
    this._hero.equip(new Gun(this.game));

    this._goon1 = this._enemyFactory.create(this._enemyFactory.types.GOON, 450, 300);

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
    physics.collide(this._hero , this._goon1);

    this._checkComplete();
  },

  run: function() {
    this._control.update(true).then(() => {
      this._checkComplete();
    });
  },

  _checkComplete: function() {
    if (this._complete()) this.state.start(Game.states.LEVEL_2);
  },

  _complete: function() {
    return false;
  }
};
