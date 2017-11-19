class KeyboardController {
  constructor(context) {
    this._hero = context.hero;
    this._keyboard = context.input;
    this._cursors = this._keyboard.createCursorKeys();
    this._cursors.fire = this._keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    this._blockMove = false;
  }

  update() {
    this._updateHeroMovement();
    this._updateHeroAction();
  }

  _updateHeroMovement() {
    const hero = this._hero;
    const cursors = this._cursors;

    let action = null;
    if (cursors.up.isDown) action = hero.getAction(MoveUpAction.name);
    else if (cursors.right.isDown) action = hero.getAction(MoveRightAction.name);
    else if (cursors.down.isDown) action = hero.getAction(MoveDownAction.name);
    else if (cursors.left.isDown) action = hero.getAction(MoveLeftAction.name);
    return (action && action.perform()) || hero.stop();

  }

  _updateHeroAction() {
    const hero = this._hero;
    const cursors = this._cursors;
    let action = null;
    if (cursors.fire.isDown) action = hero.getAction(ShootAction.name);
    if (action) action.perform();
  }
}
