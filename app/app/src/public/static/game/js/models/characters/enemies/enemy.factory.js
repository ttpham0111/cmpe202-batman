class EnemyFactory {
  constructor(game) {
    this._game = game;

    this.types = {
      GOON: 0
    }
  }

  create(type, x, y, count) {
    count = count || 1;

    switch (type) {
      case this.types.GOON:
        return this._createGoons(x, y, count);
        break;
      default:
        return this._createAny(x, y, count);
    }
  }

  _createAny(x, y, count) {
    return this._createGoons(x, y, count);
  }

  _createGoons(x, y, count) {
    const game = this._game;
    const group = game.add.group();

    while (count-- > 0) {
      new Goon(game, x, y, group);
    }

    return group;
  }
}