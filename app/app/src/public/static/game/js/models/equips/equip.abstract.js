class Equip {
  static get TYPE_HEADGEAR() { return 0; }
  static get TYPE_BODY_ARMOR() { return 1; }
  static get TYPE_WEAPON() { return 2; }

  constructor(type, healthModifier, strengthModifier, speedModifier, actions) {
    this._type = type;
    this._healthModifier = healthModifier;
    this._strengthModifier = strengthModifier;
    this._speedModifier = speedModifier;
    this._actions = actions || [];
    this._equipped = false;
  }

  get type() {
    return this._type;
  }

  get healthModifier() {
    return this._healthModifier;
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

  equip(hero) {
    if (!this._equipped) this._equip(hero);
    this._equipped = true;
  }

  _equip(hero) {}
}