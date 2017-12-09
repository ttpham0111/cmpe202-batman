class Sword extends Equip {
  static get FRAME() { return 'items_sword_0.png'; }

  constructor(game) {
    super(Sword.FRAME, 'Sword', {
      location: Player.EQUIP_LOCATIONS.HAND_R,
      strengthModifier: 1,
      speedModifier: 0
    });
    this._actions = [new AttackAction(this)];
    this._game = game;
  }

  attack() {
    const player = this._player;
    if (player.isAttacking) return;

    const game = this._game;
    const hitbox = game.make.sprite(player.x - 32, player.y - 32);

    game.physics.arcade.enable(hitbox);
    hitbox.body.setCircle(40);
    player.hitbox = hitbox;

    player.slash().onComplete.addOnce(() => {
      hitbox.destroy();
      player.hitbox = null;
    });
  }
}