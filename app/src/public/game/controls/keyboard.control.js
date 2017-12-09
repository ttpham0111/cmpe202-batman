class KeyboardController extends Controller {
  constructor(level) {
    super(level);

    this._keyboard = level.input.keyboard;
    this._cursors = this._keyboard.createCursorKeys();
    this._cursors.attack = this._keyboard.addKey(Phaser.KeyCode.SPACEBAR);
  }

  update() {
    super.update();

    if (!this._player.isDisabled) this._updatePlayerMovement();
    this._updatePlayerAction();
  }

  _updatePlayerMovement() {
    const player = this._player;
    const cursors = this._cursors;

    let action = null;

    if (cursors.up.isDown) action = player.getAction(MoveUpAction.name);
    else if (cursors.right.isDown) action = player.getAction(MoveRightAction.name);
    else if (cursors.down.isDown) action = player.getAction(MoveDownAction.name);
    else if (cursors.left.isDown) action = player.getAction(MoveLeftAction.name);
    else player.stop();

    if (action) action.perform();
  }

  _updatePlayerAction() {
    const player = this._player;
    const cursors = this._cursors;

    let action = null;
    if (cursors.attack.isDown) action = player.getAction(AttackAction.name);

    if (action) action.perform();
  }
}
