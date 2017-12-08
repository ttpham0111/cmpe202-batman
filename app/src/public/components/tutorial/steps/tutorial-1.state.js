class Tutorial1Step1 extends TutorialStep {
  constructor(tutorial) {
    super(tutorial);

    this.modalClass = '';
    this.modalText = 'This is the game screen.';
    this.pointerPlacement = 'left';
    this.pointerTarget = 'game-screen';
    this.pointerDirection = 'right';
  }

  play() {
    this.pointer.show();
    this.tutorial.showModal();
  }

  next() {
    this.tutorial.next(Tutorial1Step2);
  }
}

class Tutorial1Step2 extends TutorialStep {
  constructor(tutorial) {
    super(tutorial);

    this.modalClass = '';
    this.modalText = 'This is the code editor. Write and run code here.';
    this.pointerPlacement = 'right';
    this.pointerTarget = 'editor';
    this.pointerDirection = 'left';
  }

  play() {
    this.pointer.show();
    this.tutorial.showModal();
  }

  next() {
    this.tutorial.next(Tutorial1Step3);
  }
}

class Tutorial1Step3 extends TutorialStep {
  constructor(tutorial) {
    super(tutorial);

    this.modalClass = '';
    this.modalText = "Click 'Run' to execute the code";
    this.pointerPlacement = 'top';
    this.pointerTarget = 'btn-run';
    this.pointerDirection = 'down';
  }

  play() {
    this.pointer.show();
    this.tutorial.showModal();
  }
}