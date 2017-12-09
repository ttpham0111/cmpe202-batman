class EnemyFactory {
  static get TYPES() {
    return {
      CHUCHU_GREEN: 0,
      CHUCHU_BLUE: 1,
      ROPE: 2
    };
  }

  static get ENEMIES() {
    const classes = {};

    classes[EnemyFactory.TYPES.CHUCHU_GREEN] = ChuchuGreen;
    classes[EnemyFactory.TYPES.CHUCHU_BLUE] = ChuchuBlue;
    classes[EnemyFactory.TYPES.ROPE] = Rope;

    return classes;
  }

  constructor(game) {
    this._game = game;
  }

  create(type, x, y, count) {
    count = count || 1;
    x = x || 0;
    y = y || 0;

    return this._createEnemy(EnemyFactory.ENEMIES[type], x, y, count);
  }

  _createEnemy(enemyClass, x, y, count) {
    enemyClass = enemyClass || ChuchuGreen;

    const game = this._game;
    const group = game.add.group();
    while (count-- > 0) {
      new enemyClass(game, x, y, group);
    }

    return group;
  }
}