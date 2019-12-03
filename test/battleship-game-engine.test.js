const expect = require('chai').expect;

const BattleshipGameEngine = require('../src/battleship-game-engine');

describe('BattleshipGameEngine', () =>
{
    let bge;

    beforeEach(() =>
    {
        bge = new BattleshipGameEngine();
    });

    describe('start fn', () =>
    {
        it('should return object exposing shoot function', () =>
        {
            const game = bge.start();
            expect(game).to.have.property('shoot');
        });
    });
});