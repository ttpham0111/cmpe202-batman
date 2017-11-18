class Action {
  constructor(name) {
    this._name = name;
    this._onComplete = new Phaser.Signal();
  }

  get name() {
    return this._name;
  }

  get onComplete() {
    return this._onComplete;
  }
}

