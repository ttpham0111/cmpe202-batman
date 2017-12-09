class Level2 extends LevelState {
  constructor() {
    super();

    this.editorText = `/**
 * The house was empty and looked safe.
 *
 * I rummaged around and found a safe of 
 * some kind. There was a note nearby that
 * had some hints on how to open it.
 *
 * After luckily guessing the password,
 * I retrieved a sword from the safe. I was
 * too tired to think about why it was there.
 *
 * I fell into bed and quickly drifted away...
 */
    
    
    `;
  }

  create() {
    super.create();

    this.player.scale.set(1.25);
    this.player.facing = Phaser.ANGLE_UP;
    this.player.updateAnimation();

    const objective1 = new Objective('Open the locked safe');
    objective1.onComplete.addOnce(this._animateObtainItem, this, undefined, new Sword());

    this.objectives.push(objective1);
    this.objectives.push(new Objective("Catch some Z's"));

    this._safe = this._findPoi('goal1');
    this._safeZone = this._createZone(this._safe);
  }

  update() {
    super.update();

    if (this._playerAtSafe && !this._visitedSafe) {
      this._visitedSafe = true;
      this._animateMove(this._safe.properties.animationEndX,
                        this._safe.properties.animationEndY,
                        this._showRiddle.bind(this));
    }

    if (this._playerAtEnd) this.objectives[1].complete();
  }

  get _playerAtSafe() {
    return this._safeZone.contains(this.player.x, this.player.y);
  }

  _loadMap() {
    const map = this.game.add.tilemap(Constants.STATES.LEVEL_PREFIX + 2);
    map.addTilesetImage(Constants.ASSET_KEYS.TILESET_IMAGE_HOUSE_1_DARK);

    map.createLayer('ground1').resizeWorld();
    ['ground2', 'wall1', 'wall2'].forEach(layer => map.createLayer(layer));

    return map;
  }

  _showRiddle() {
    let question = Constants.TRIVIA[Math.floor(Math.random() * Constants.TRIVIA.length)];
    while (prompt(question.question, '').toLowerCase() !== question.answer) {
      question = Constants.TRIVIA[Math.floor(Math.random() * Constants.TRIVIA.length)];
    }

    this.objectives[0].complete();
  }
}
