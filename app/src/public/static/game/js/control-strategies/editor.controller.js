class EditorController {
  constructor(context) {
    this._hero = context.hero;
    this._editor = context.input;
  }

  update(run) {
    if (!run) return;
    const commands = this._parseCommands(this._editor.getValue());
    return this._applyCommands(commands);
  }

  _parseCommands(text) {
    const heroCommands = [];

    text.split('\n').join(';').split(';').forEach((line) => {
      if (line.startsWith('hero.')) {
        heroCommands.push(line.replace('hero.', '').replace('()', ''));
      }
    });

    return heroCommands;
  }

  _applyCommands(commands) {
    return new Promise((resolve, reject) => {
      const hero = this._hero;

      const actions = commands.reduce((_actions, command) => {
        const action = hero.getAction(command);
        return (action && _actions.push(action)) ? _actions : reject();
      }, []);
      if (actions.length === 0) return reject();

      let i = 0;
      function doAction() {
        const action = actions[i];
        if (++i < actions.length) action.onComplete.addOnce(doAction);
        else {
          action.onComplete.addOnce(hero.stop, hero);
          action.onComplete.addOnce(resolve);
        }
        action.perform();
      }
      doAction();
    });
  }
}
