class LevelState extends Phaser.State {
  constructor() {
    super();

    this.editorText = '';
  }

  preload() {
    super.preload();

    this.map = this._loadMap();
    this.scale.setGameSize(this.map.widthInPixels, this.map.heightInPixels);
  }

  create(options) {
    super.create();

    options = options || {};

    this._startPoint = this._findPoi('start');
    this._endPoint = this._findPoi('end');
    this._endZone = this._createZone(this._endPoint);

    this._collisionLayer = this.map.createLayer('collision');
    this._collisionLayer.visible = false;
    this.map.setCollisionBetween(0, 500, true, 'collision');

    this.objectives = [];

    this.enemyFactory = new EnemyFactory(this.game);
    this.enemies = this._loadEnemies();

    this.player = new Player(this.game,
                             this._startPoint.properties.animationStartX,
                             this._startPoint.properties.animationStartY,
                             undefined, undefined, options.hasCap);
    this.player.events.onKilled.add(() => {
      this.state.restart();
    });

    this._keyboardController = new KeyboardController(this);
    this._editorController = new EditorController(this);
    this._controller = this._editorController;
    this._lockInput = false;
  }

  update() {
    super.update();

    if (!this._initiated) {
      this._animateStart();
      this._initiated = true;
    }

    this.physics.arcade.collide(this.player, this._collisionLayer);
    this.physics.arcade.collide(this.enemies, this._collisionLayer);
    this.physics.arcade.collide(this.player, this.enemies, (player, enemy) => {
      enemy.collideWith(player);
    });

    if (this.player.hitbox) {
      this.enemies.forEach((enemyGroup) => {
        this.physics.arcade.collide(this.player.hitbox, enemyGroup, (hitbox, enemy) => {
          enemy.damage(this.player.strength);
        });
      });
    }

    if (!this._lockInput) this._controller.update();

    if (this._playerLost) {
      this.state.restart();
    }
    else if (this._playerWon && this._playerAtEnd) {
      this._nextLevel();
    }
  }

  shutdown() {
    super.shutdown();

    this.map.destroy();
    this._collisionLayer.destroy();
    this.enemies.forEach(enemy => enemy.destroy());
    this.player.destroy();

    this._startPoint = null;
    this._endPoint = null;
    this._endZone = null;
    this.objectives = null;

    this._lockInput = false;
  }

  get _playerLost() {
    return this.objectives.some((objective) => objective.isFailed);
  }

  get _playerWon() {
    return this.objectives.every((objective) => objective.isCompleted);
  }

  get _playerAtEnd() {
    return this._endZone.contains(this.player.x, this.player.y);
  }

  get lockInput() {
    return this._lockInput;
  }

  get controller() {
    return this._controller;
  }

  toggleInput() {
    this._controller = (this._controller === this._editorController)
                       ? this._keyboardController
                       : this._editorController;
  }

  _loadMap() {}

  _findPoi(name) {
    const poi = this.map.objects.poi;
    for (let i = 0; i < poi.length; i++) {
      if (poi[i].name === name) return poi[i];
    }
  }

  _createZone(poi) {
    return new Phaser.Rectangle(poi.x, poi.y, poi.width, poi.height);
  }

  _loadEnemies() {
    return [];
  }

  _animateStart() {
    this._animateMove(this._startPoint.properties.animationEndX,
                      this._startPoint.properties.animationEndY);
  }

  _animateEnd(callback) {
    this._animateMove(this._endPoint.properties.animationEndX,
                      this._endPoint.properties.animationEndY,
                      callback);
  }

  _animateMove(x, y, callback) {
    this._lockInput = true;
    this.player.body.bounce.set(0, 0);

    const angle = this.physics.arcade.moveToXY(this.player, x, y, undefined, 1000);
    this.player.facing = Math.round(this.math.radToDeg(this.math.normalizeAngle(angle)) / 90) * 90;
    this.player.updateAnimation();

    setTimeout(() => {
      this.player.body.bounce.set(1, 1);
      this._lockInput = false;
      callback && callback();
    }, 1000);
  }

  _animateObtainItem(item) {
    this._lockInput = true;
    const duration = 2000;

    item.animateObtained(this.game, this.player, duration);
    this.player.obtainItem(item);

    setTimeout(() => {
      this.player.faceDown();
      this._lockInput = false;
    }, duration);
  }

  _nextLevel() {
    if (this._transitioning) return;
    this._transitioning = true;

    this._animateEnd(() => {
      this.camera.fade('#000000');
      this.camera.onFadeComplete.add(() => {
        const currentLevel = this.state.current;
        const currentLevelIndex = parseInt(currentLevel.replace(Constants.STATES.LEVEL_PREFIX, ''));
        this.state.start(Constants.STATES.LEVEL_PREFIX + (currentLevelIndex + 1));
        this._transitioning = false;
      });
    });
  }
}