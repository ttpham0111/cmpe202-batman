class Level3 extends LevelState {
  constructor() {
    super();

    this.editorText = `/**
 * It's as if I slept for a very long time.
 * 
 * When I stepped outside the house, I was
 * surrounded by Chuchus.
 *
 * In the rush of battle, I hadn't noticed
 * that the world had changed around me.
 *
 * There was a town in the distance...
 */
    
    
moveDown();
attack();`;
  }

  create() {
    super.create({
      hasCap: true
    });

    this.player.scale.set(1.25);
    this.player.faceDown();
    this.player.equip(new Sword(this.game));

    this.objectives.push(new Objective('Kill Chuchus'));
    this.objectives.push(new Objective('Go to the town'));
  }

  update() {
    super.update();

    const totalAlive = this.enemies.reduce((_total, enemyGroup) => {
      return _total + enemyGroup.countLiving();
    }, 0);
    if (totalAlive === 0) this.objectives[0].complete();

    if (this._playerAtEnd) this.objectives[1].complete();
  }

  _loadMap() {
    const map = this.game.add.tilemap(Constants.STATES.LEVEL_PREFIX + 3);
    map.addTilesetImage(Constants.ASSET_KEYS.TILESET_IMAGE_FIELD_1_DARK);

    map.createLayer('ground1').resizeWorld();
    ['ground2', 'wall1', 'wall2'].forEach(layer => map.createLayer(layer));

    return map;
  }

  _loadEnemies() {
    const enemyData = this.map.objects.enemies;

    return [
      this.enemyFactory.create(EnemyFactory.TYPES.CHUCHU_GREEN, enemyData[0].x, enemyData[0].y),
      this.enemyFactory.create(EnemyFactory.TYPES.CHUCHU_BLUE, enemyData[1].x, enemyData[1].y)
    ];
  }
}