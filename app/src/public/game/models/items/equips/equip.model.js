class Equip {
  static get SPRITE_KEY() { return 'sprite-items'; }

  constructor(frame, name, attributes) {
    this._frame = frame;
    this._name = name;
    this._location = attributes.location;
    this._strengthModifier = attributes.strengthModifier;
    this._speedModifier = attributes.speedModifier;
    this._actions = attributes.actions || [];
    this._equipped = false;
  }

  get name() {
    return this._name;
  }

  get location() {
    return this._location;
  }

  get strengthModifier() {
    return this._strengthModifier;
  }

  get speedModifier() {
    return this._speedModifier;
  }

  get actions() {
    return this._actions;
  }

  animateObtained(game, player, duration) {
    const item = game.add.sprite(player.x - 8, player.y - 32, Equip.SPRITE_KEY, this._frame);
    item.scale.set(1.25);
    setTimeout(() => {
      item.destroy();
    }, duration)
  }

  equipTo(player) {
    if (!this._equipped) {
      this._player = player;
      player.increaseStrength(this.strengthModifier);
      player.increaseSpeed(this.speedModifier);
      player.addActions(this.actions);

      this._equipTo(player);
      this._equipped = true;
    }
  }

  unequip() {
    if (this._equipped) {
      this._player.reduceStrength(this.strengthModifier);
      this._player.reduceSpeed(this.speedModifier);
      this._player.removeActions(this.actions);

      this._unequip();
      this._equipped = false;
    }
  }

  _equipTo(player) {}
  _unequip() {}
}