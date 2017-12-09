class Constants {
  static get GAME_WIDTH() { return 480; }
  static get GAME_HEIGHT() { return 480; }

  static get STATES() {
    return {
      BOOT: 'state-boot',
      PRELOADER: 'state-preloader',
      INTRO: 'state-intro',
      MAIN_MENU: 'state-main-menu',
      LEVEL_PREFIX: 'state-level-',
      GAME_OVER: 'state-gameover'
    };
  }

  static get NUM_LEVELS() { return 3; }

  static get ASSET_KEYS() {
    return {
      TILESET_IMAGE_FIELD_1_DARK: 'field-1-dark',
      TILESET_IMAGE_HOUSE_1_DARK: 'house-1-dark'
    };
  }

  static get DIRECTION_KEYS() {
    const data = {};
    data[Phaser.ANGLE_UP] = 'back';
    data[Phaser.ANGLE_RIGHT] = 'side';
    data[Phaser.ANGLE_DOWN] = 'front';
    data[Phaser.ANGLE_LEFT] = 'side';
    return data;
  }

  static get TRIVIA() {
    return [
      {
        question: 'What is the design pattern that is used when creation of object directly is costly?',
        answer: 'prototype'
      },
      {
        question: 'Define a family of algorithms, encapsulate each one, and make them interchangeable. It lets the algorithm vary independently from clients that use it.',
        answer: 'strategy'
      },
      {
        question: 'Encapsulate a request as an object, there by letting you parametrize clients with different requests, queue or log requests, and support undoable operation.',
        answer: 'command'
      },
      {
        question: 'Provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation.',
        answer: 'iterator'
      }
    ];
  }
}