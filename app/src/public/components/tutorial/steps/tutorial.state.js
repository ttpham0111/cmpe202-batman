class TutorialStep {
  constructor(tutorial) {
    this.tutorial = tutorial;
    this._init();
  }

  _init() {
    this._pointer = null;
    this.modalClass = '';
    this.modalText = '';
    this.pointerPlacement = '';
    this.pointerTarget = '';
    this.pointerDirection = '';
  }

  get pointer() {
    if (this._pointer) return this._pointer;
    this._pointer = this.tutorial.createPointer();
    return this._pointer;
  }

  play() {}

  next() {
    this.tutorial.next();
  }

  end() {
    this.tutorial.hideModal();
    this._pointer && this._pointer.hide();
    delete this._pointer;
    this._init();
  }
}

class NoTutorialState extends TutorialStep {}