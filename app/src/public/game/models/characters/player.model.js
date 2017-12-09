class Player extends Character {
  static get SPRITE_KEY_1() { return 'sprite-player-1'; }
  static get SPRITE_KEY_2() { return 'sprite-player-2'; }

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

  constructor(game, x, y, group, name, hasCap) {
    super(game, x, y, (hasCap) ? Player.SPRITE_KEY_2 : Player.SPRITE_KEY_1, group, name || 'Link', {
      maxHealth: 12,
      strength: 1,
      speed: 100
    });

    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.bounce.set(1, 1);

    this.anchor.setTo(.5,.5);

    this._actions = {};
    this._equips = new Array(Object.keys(Player.EQUIP_LOCATIONS).length);
    this._preventAnimationUpdate = false;

    this._addAnimations();
    this._addDefaultActions();
  }

  get isAttacking() { return this._disabled; }

  stop() {
    if (this.isMoving) this.animations.stop();
    super.stop();
  }

  updateAnimation() {
    if (this._preventAnimationUpdate) return;

    let action = 'idle';
    if (this.isMoving) action = 'walk';

    this.animations.play('link_' + action + '_' + Constants.DIRECTION_KEYS[this.facing]);
  }

  _addAnimations() {
    this._setDirectionalFrames('link_idle', [3, 1, 3], 1, true);
    this._setDirectionalFrames('link_walk', 10, undefined, true);

    this._setDirectionalFrames('link_slash', 10, 50);
    this._setFrames(['link_item', 'link_big_item'], 3);
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

  obtainItem(item) {
    this.stop();

    let animation = 'link_item';
    if (item instanceof Equip) {
      animation = 'link_big_item';
      this.equip(item);
    }
    this.animations.play(animation);
  }

  slash() {
    if (this._disabled) return;
    this._disabled = true;
    this._preventAnimationUpdate = true;

    this.stop();
    const animation = this.animations.play('link_slash_' + Constants.DIRECTION_KEYS[this.facing]);
    animation.onComplete.addOnce(() => {
      this._preventAnimationUpdate = false;
      this.updateAnimation();
    });

    setTimeout(() => {
      this._disabled = false;
    }, this.delay);

    return animation;
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
  }

  unequip(location) {
    if (this._equips[location]) {
      this._equips[location].unequip();
      this._equips[location] = null;
    }
  }
}