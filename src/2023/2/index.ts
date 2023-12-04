// https://adventofcode.com/2023/day/2
// https://adventofcode.com/2023/day/2/input
export const solution = (file: string): void => {
    const games = file
        .replaceAll(/Game \d+: /g, '')
        .split('\n')
        .map((game) =>
            game.split('; ').map((set) =>
                set.split(', ').map((cubes) => {
                    const [count, color] = cubes.split(' ');
                    if (
                        !count ||
                        !color ||
                        (color !== 'red' && color !== 'green' && color !== 'blue') ||
                        !Number.isInteger(Number.parseInt(count, 10))
                    ) {
                        throw new Error('Invalid cube');
                    }

                    return {
                        count: Number.parseInt(count, 10),
                        color: color as 'red' | 'green' | 'blue',
                    };
                })
            )
        );

    const maxRed = 12;
    const maxGreen = 13;
    const maxBlue = 14;

    let partOneSum = 0;
    let partTwoSum = 0;

    for (const [i, game] of games.entries()) {
        const gameId = i + 1;

        let isPossible = true;

        let leastRed = 0;
        let leastGreen = 0;
        let leastBlue = 0;
        for (const set of game) {
            let currentRed = 0;
            let currentGreen = 0;
            let currentBlue = 0;
            for (const cubes of set) {
                if (cubes.color === 'red') currentRed += cubes.count;
                if (cubes.color === 'green') currentGreen += cubes.count;
                if (cubes.color === 'blue') currentBlue += cubes.count;

                if (currentRed > leastRed) leastRed = currentRed;
                if (currentGreen > leastGreen) leastGreen = currentGreen;
                if (currentBlue > leastBlue) leastBlue = currentBlue;
            }

            if (currentRed > maxRed || currentGreen > maxGreen || currentBlue > maxBlue) {
                isPossible = false;
            }
        }

        if (isPossible) {
            partOneSum += gameId;
        }

        const power = leastRed * leastGreen * leastBlue;
        partTwoSum += power;
    }

    console.log('Part 1:', partOneSum);
    console.log('Part 2:', partTwoSum);
};
