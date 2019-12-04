const Ship = require('./ship');

const { randomPoint } = require('./helpers/random');

const BattleshipGameEngine = function (options = {})
{
    // Properties
    const size = options.size || 8;
    const shipSizes = options.ships || [2, 3, 4];

    const ships = [];
    const shots = [];

    // Functions
    const containsShip = ({ x, y }) => ships.some(s => s.occupies(x, y));

    const outOfBounds = (shipSize, { x, y }) => x + shipSize > size || y + shipSize > size;

    const placementPossible = (shipSize, point) =>
    {
        if (outOfBounds(shipSize, point) || containsShip(containsShip(point)))
        {
            return false;
        }

        return true;
    };

    const placeShip = (ship, point, vertical) =>
    {
        if (!placementPossible(ship.size, point, vertical))
        {
            return false;
        }

        ship.place(point, vertical);
        ships.push(ship);

        return true;
    };

    const randomize = ships =>
    {
        for (ship of ships)
        {
            const vertical = Math.random() >= 0.5;

            while (!placeShip(ship, randomPoint(size), vertical));
        }
    };

    const shoot = (x, y) =>
    {
        let hit = false;
        let sunk = false;

        for (let ship of ships)
        {
            if (ship.hit(x, y))
            {
                hit = true;
                sunk = ship.sunk();
                break;
            }
        }

        shots.push({ x, y, hit });

        return {
            hit,
            shots,
            sunk,
            remainingShips: ships.filter(s => !s.sunk()).length
        };
    }

    const start = () =>
    {
        randomize(shipSizes.map(s => new Ship(s)));
        return { shoot };
    };

    return {
        start
    }
}

module.exports = BattleshipGameEngine;