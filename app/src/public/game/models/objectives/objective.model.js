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

  get onComplete() {
    if (this._onComplete) return this._onComplete;
    this._onComplete = new Phaser.Signal();
    return this._onComplete;
  }

  get onFail() {
    if (this._onFail) return this._onFail;
    this._onFail= new Phaser.Signal();
    return this._onFail;
  }

  complete() {
    this._completed = true;
    this._onComplete && this._onComplete.dispatch();
  }

  fail() {
    this._failed = true;
    this._onFail && this._onFail.dispatch();
  }
}