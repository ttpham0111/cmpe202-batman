class Hero extends Character {
  constructor(game, x, y, group, initialStats) {
    initialStats = initialStats || {
      name: 'Batman',
      maxHealth: 100,
      strength: 10,
      speed: 100
    };
    super(game, x, y, Game.SPRITE_HERO_KEY, group, initialStats);

    const numFrames = 9;
    this._setDirectionFrames(0, numFrames * 3, numFrames * 2, numFrames);
    this._setDirectionAnimation(
      Array.from(new Array(numFrames), (x, i) => i),
      Array.from(new Array(numFrames), (x, i) => i + (numFrames * 3)),
      Array.from(new Array(numFrames), (x, i) => i + (numFrames * 2)),
      Array.from(new Array(numFrames), (x, i) => i + numFrames)
    );

    const defaultActions = [
      new MoveUpAction(this),
      new MoveRightAction(this),
      new MoveDownAction(this),
      new MoveLeftAction(this)
    ];
    this._actions = {};
    this.addActions(defaultActions);

    this.equipLocations = {
      HEADGEAR: 0,
      BODY_ARMOR: 1,
      WEAPON_R: 4,
      WEAPON_L: 5
    };

    this._equips = new Array(Object.keys(this.equipLocations).length);
  }

  getAction(name) {
    return this._actions[name];
  }

  addActions(actions) {
    const heroActions = this._actions;
    actions.forEach((action) => {
      heroActions[action.name] = action;
    });
  }

  removeActions(actions) {
    const heroActions = this._actions;
    actions.forEach((action) => {
      delete heroActions[action.name];
    });
  }

  equip(equipment) {
    let location = null;
    switch (equipment.type) {
      case Equip.TYPE_HEADGEAR:
        location = this.equipLocations.HEADGEAR;
        break;

      case Equip.TYPE_BODY_ARMOR:
        location = this.equipLocations.BODY_ARMOR;
        break;

      case Equip.TYPE_WEAPON:
        location = this._equips[this.equipLocations.WEAPON_R]
                   ? this.equipLocations.WEAPON_L : this.equipLocations.WEAPON_R;
        break;

      default:
        return
    }

    this._equips[location] = equipment;
    this.addActions(equipment.actions);
  }

  unequip(location) {
    const equipment = this._equips[location];
    this.removeActions(equipment.actions);
    delete this._equips[location];
  }
}
