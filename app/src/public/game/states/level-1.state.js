class Level1 extends LevelState {
  constructor() {
    super();

    this.editorText = `/**
 * I've been lost in these woods for days
 * before I stumbled upon a house that looked 
 * abandoned. Something about it felt wrong.
 *
 * The last bit of light was soon to disappear,
 * I had little choice but to stay the night.
 */
    
    
moveRight();
moveDown();`;
  }

  create() {
    super.create();

    this.player.scale.set(1.25);
    this.player.facing = Phaser.ANGLE_DOWN;
    this.player.updateAnimation();

    this.objectives.push(new Objective('Get inside the house'));
  }

  update() {
    super.update();

    if (this._playerAtEnd) this.objectives[0].complete();
  }

  _loadMap() {
    const map = this.game.add.tilemap(Constants.LEVEL_PREFIX + 1);
    map.addTilesetImage(Constants.ASSET_KEYS.TILESET_IMAGE_FIELD_1_DARK);

    map.createLayer('ground1').resizeWorld();
    ['ground2', 'wall1', 'wall2'].forEach(layer => map.createLayer(layer));

    return map;
  }

  _loadEnemies() {
    const enemies = this.add.group();
    enemies.add(this.enemyFactory.create(EnemyFactory.TYPES.CHUCHU_GREEN, 170, 128));
    enemies.add(this.enemyFactory.create(EnemyFactory.TYPES.CHUCHU_BLUE, 160, 164));
    return enemies;
  }
}