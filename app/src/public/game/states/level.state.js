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

  create() {
    super.create();

    this._startPoint = this._findPoi('start');
    this._endPoint = this._findPoi('end');

    this._collisionLayer = this.map.createLayer('collision');
    this._collisionLayer.visible = false;
    this.map.setCollisionBetween(0, 500, true, 'collision');

    this.objectives = [];
    this._endZone = new Phaser.Rectangle(this._endPoint.x, this._endPoint.y,
                                         this._endPoint.width, this._endPoint.height);

    this.enemyFactory = new EnemyFactory(this.game);
    this.enemies = this._loadEnemies();

    this.player = new Player(this.game,
                             this._startPoint.properties.animationStartX,
                             this._startPoint.properties.animationStartY);

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
    this.physics.arcade.collide(this.player, this.enemies);

    if (!this._lockInput) this._controller.update();

    if (this._playerLost) {
      this.state.restart();
    }
    else if (this._playerWon && this._playerAtEnd) {
      this._nextLevel();
    }
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

  _findPoi(name) {
    const poi = this.map.objects.poi;
    for (let i = 0; i < poi.length; i++) {
      if (poi[i].name === name) return poi[i];
    }
  }

  _loadEnemies() {
    return this.add.group();
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
    const angle = this.physics.arcade.moveToXY(this.player, x, y, undefined, 1000);
    this.player.facing = Math.round(this.math.radToDeg(this.math.normalizeAngle(angle)) / 90) * 90;
    this.player.updateAnimation();

    setTimeout(() => {
      this._lockInput = false;
      callback && callback();
    }, 1000);
  }

  _nextLevel() {
    if (this._transitioning) return;
    this._transitioning = true;

    this._animateEnd(() => {
      this._transitioning = false;

      this.camera.fade('#000000');
      this.camera.onFadeComplete.add(() => {
        const currentLevel = this.state.current;
        const currentLevelIndex = parseInt(currentLevel.replace(Constants.STATES.LEVEL_PREFIX, ''));
        this.state.start(Constants.STATES.LEVEL_PREFIX + (currentLevelIndex + 1));
      });
    });
  }
}