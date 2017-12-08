class Player extends Character {
  static get SPRITE_KEY() { return 'sprite-player'; }

  static get EQUIP_LOCATIONS() {
    return {
      HEAD: 0,
      BODY: 1,
      LEGS: 2,
      FEET: 3,
      HAND_R: 4,
      HAND_L: 5
    };
  }

  constructor(game, x, y, group, name) {
    super(game, x, y, Player.SPRITE_KEY, group, name || 'Link', {
      maxHealth: 12,
      strength: 10,
      speed: 100
    });

    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    this.anchor.setTo(.5,.5);

    this._actions = {};
    this._equips = new Array(Object.keys(Player.EQUIP_LOCATIONS).length);

    this._addAnimations();
    this._addDefaultActions();
  }

  stop() {
    this.animations.stop();
    super.stop();
  }

  updateAnimation() {
    let action = 'idle';
    if (this.isMoving) action = 'walk';

    this.animations.play('link_' + action + '_' + Constants.DIRECTION_KEYS[this.facing]);
  }

  _addAnimations() {
    this._setDirectionalFrames('link_idle', [3, 1, 3], undefined, true);
    this._setDirectionalFrames('link_walk', 10, undefined, true);
  }

  _addDefaultActions() {
    const defaultActions = [
      new MoveUpAction(this),
      new MoveRightAction(this),
      new MoveDownAction(this),
      new MoveLeftAction(this)
    ];

    this.addActions(defaultActions);
  }

  getAction(name) {
    return this._actions[name];
  }

  addActions(actions) {
    const playerActions = this._actions;
    actions.forEach((action) => {
      playerActions[action.name] = action;
    });
  }

  removeActions(actions) {
    const playerActions = this._actions;
    actions.forEach((action) => {
      delete playerActions[action.name];
    });
  }

  equip(equipment) {
    let location = equipment.location;
    const locations = Player.EQUIP_LOCATIONS;
    if (this._equips[location] && (location === locations.HAND_R || location === locations.HAND_L)) {
      location = (location === locations.HAND_R) ? locations.HAND_L : locations.HAND_R;
    }

    this.unequip(location);
    equipment.equipTo(this);
    this._equips[location] = equipment;
    this.addActions(equipment.actions);
  }

  unequip(location) {
    this.removeActions(this._equips[location].actions);
    this._equips[location] = null;
  }
}