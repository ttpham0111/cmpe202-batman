class EnemyFactory {
  constructor(game) {
    this._game = game;

    this.types = {
      GOON: 0,
      RIDDLER: 1,
      IVY: 2
    }
  }

  create(type, x, y, count) {
    count = count || 1;

    switch (type) {
      case this.types.GOON:
        return this._createGoons(x, y, count);
        break;
      case this.types.RIDDLER:
        return this._createRiddler(x,y,count)
        break;
      case this.types.IVY:
        //return this.?
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

   _createRiddler(x, y, count) {
    const game = this._game;
    const group = game.add.group();    
    while (count-- > 0) {
      new Riddler(game, x, y, group);
    }
    return group;
  }

}