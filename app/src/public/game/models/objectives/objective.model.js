class Objective {
  constructor(description) {
    this._description = description;

    this._completed = false;
    this._onComplete = null;

    this._failed = false;
    this._onFail = null;
  }

  get description() {
    return this._description;
  }

  get isCompleted() {
    return this._completed;
  }

  get isFailed() {
    return this._failed;
  }

  enableEvents() {
    this._onComplete = new Phaser.Signal();
    this._onFail = new Phaser.Signal();
  }

  complete() {
    this._completed = true;
    this._onComplete && this._onComplete.signal();
  }

  fail() {
    this._failed = true;
    this._onFail && this._onFail.signal();
  }
}