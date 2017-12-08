class EnemyFactory {
  static get TYPES() {
    return {
      CHUCHU_GREEN: 0,
      CHUCHU_BLUE: 1,
    };
  }

  constructor(game) {
    this._game = game;
  }

  create(type, x, y, count) {
    count = count || 1;
    x = x || 0;
    y = y || 0;

    switch (type) {
      case EnemyFactory.TYPES.CHUCHU_GREEN:
        return this._createChuchuGreen(x, y, count);
        break;
      case EnemyFactory.TYPES.CHUCHU_BLUE:
        return this._createChuchuBlue(x, y, count);
        break;
      default:
        return this._createAny(x, y, count);
    }
  }

  _createEnemy(enemyClass, x, y, count) {
    const game = this._game;
    const group = game.add.group();
    while (count-- > 0) {
      new enemyClass(game, x, y, group);
    }

    return group;
  }

  _createAny(x, y, count) {
    return this._createChuchuGreen(x, y, count);
  }

  _createChuchuGreen(x, y, count) {
    return this._createEnemy(ChuchuGreen, x, y, count);
  }

  _createChuchuBlue(x, y, count) {
    return this._createEnemy(ChuchuBlue, x, y, count);
  }
}