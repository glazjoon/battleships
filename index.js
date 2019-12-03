const BattleshipGameEngine = require('./src/battleship-game-engine');
const BGEConsole = require('./src/console-interface');

const game = new BattleshipGameEngine();
const consoleInterface = new BGEConsole(game);

consoleInterface.init();

module.exports = { BattleshipGameEngine, BGEConsole };

