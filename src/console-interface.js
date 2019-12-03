const readline = require('readline');
const colors = require('colors');

const BattleshipGameEngine = require('./battleship-game-engine');

const BGEConsole = function ()
{
    const game = new BattleshipGameEngine().start();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const gameLoop = (question) =>
    {
        rl.question(question, answer =>
        {
            if (answer === 'exit')
            {
                rl.close();
            }

            try
            {
                const { x, y } = parseCoordinate(answer);
                const { hit, remainingShips } = game.shoot(x, y);

                if (remainingShips === 0)
                {
                    console.log('Victory! All enemy ships have been destroyed.'.bgYellow.black);

                }
                else if (hit)
                {
                    gameLoop('You hit an enemy ship, keep shooting: '.bold)
                }
                else
                {
                    gameLoop('You hit nothing but water, try again: '.bold);
                }
            }
            catch (e)
            {
                if (e.message === 'Invalid coordinate')
                {
                    console.log('Oops, are you sure you entered a valid coordinate? Correct format is: X,Y.'.red);
                    gameLoop(`Please try again: `);
                }
            }
        });
    };

    const init = () =>
    {
        console.log('Welcome Battleships!'.bold.underline.bgBlue.white + '\n');
        console.log('Ships with sizes 2, 3, and 4 have been placed randomly on the board.\n');

        gameLoop('Enter coordinate to attack: '.bold);
    };

    const parseCoordinate = str =>
    {
        const coordStr = str.replace(/\s/g, '');
        const regex = /\d+,\d+/;

        if (!regex.test(str))
        {
            throw new Error('Invalid coordinate');
        }

        const [x, y] = coordStr.replace(' ', '').split(',');

        return { x: parseInt(x), y: parseInt(y) };
    }

    return {
        init
    }
};

module.exports = BGEConsole;