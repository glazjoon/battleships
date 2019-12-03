const Ship = function (size)
{
    let points = [];
    let isVertical = false;

    const hit = function (x, y)
    {
        const point = points.find(p => p.x === x && p.y === y);

        if (point)
        {
            point.hit = true;
            return true;
        }

        return false;
    }

    const occupies = (x, y) => points.some(p => p.x === x && p.y === y);

    const place = function ({ x, y }, vertical)
    {
        points = [];
        isVertical = vertical;

        const start = vertical ? y : x;
        const end = start + size;

        for (let i = start; i < end; i++)
        {
            points.push({
                x: vertical ? x : i,
                y: vertical ? i : y,
                hit: false
            });
        }

        console.log(points)
    }

    const sunk = () => !points.find(c => c.hit === false);

    return {
        hit,
        occupies,
        place,
        size,
        sunk,
        vertical: isVertical
    }
}

module.exports = Ship;