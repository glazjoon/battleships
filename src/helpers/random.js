const randomInt = (min, max) =>
{
    return Math.floor(Math.random() * max) + min;
}

const randomPoint = (size) =>
{
    return {
        x: randomInt(0, size - 1),
        y: randomInt(0, size - 1)
    }
};

module.exports = { randomInt, randomPoint };