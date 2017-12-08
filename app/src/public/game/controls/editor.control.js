class EditorController extends Controller {
  constructor(level) {
    super(level);
  }

  update(input) {
    super.update();

    if (this._running || this._level.lockInput) return;
    else if (!input) return this._player.stop();
    else this._running = true;

    const commands = this._parseCommands(input);
    this._applyCommands(commands);
  }

  _parseCommands(text) {
    const commands = text.split('\n').join(';').split(';').map((statement) => {
      return statement.replace('()', '');
    });
    return commands;
  }

  _applyCommands(commands) {
    const player = this._player;
    const actions = commands.reduce((_actions, command) => {
      const action = player.getAction(command);
      action && _actions.push(action);
      return _actions;
    }, []);

    this._chain(actions, 500, () => {
      this._level.lockInput || player.stop();
      this._running = false;
    });
  }

  _chain(actions, delay, callback) {
    if (actions.length === 0) return;

    let i = 1;
    actions[0].perform();
    const intervalId = setInterval(() => {
      if (i >= actions.length) {
        clearInterval(intervalId);
        return callback();
      }
      actions[i++].perform();
    }, delay);
  }
}
