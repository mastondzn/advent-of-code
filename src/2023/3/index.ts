/* eslint-disable unicorn/no-array-reduce */
/* eslint-disable unicorn/no-for-loop */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable unicorn/consistent-function-scoping */
// https://adventofcode.com/2023/day/3
// https://adventofcode.com/2023/day/3/input
export const solution = (file: string): void => {
    const grid = file.split('\n').map((line) => [...line]);
    const width = grid[0]!.length;
    const height = grid.length;

    type Coordinate = { x: number; y: number };
    type GridSymbol = { symbol: string } & Coordinate;
    type Neighbor = { char: string } & Coordinate;
    type Subgrid = { startsAt: Coordinate; endsAt: Coordinate };
    type PartNumber = { number: number } & Subgrid;

    function* iterate(
        // eslint-disable-next-line unicorn/no-object-as-default-parameter
        { startsAt, endsAt }: Subgrid = {
            startsAt: { x: 0, y: 0 },
            endsAt: { x: width, y: height },
        }
    ) {
        for (let y = 0; y < grid.length; y++) {
            const line = grid[y]!;
            for (let x = 0; x < line.length; x++) {
                if (x < startsAt.x || x > endsAt.x || y < startsAt.y || y > endsAt.y) continue;
                const char = line[x]!;
                yield { x, y, char, line };
            }
        }
    }

    const getPartNumbers = (): PartNumber[] => {
        const partNumbers: PartNumber[] = [];
        const expelled = new Set<string>();
        for (const { x, y, char } of iterate()) {
            if (expelled.has(`${x},${y}`)) {
                continue;
            }

            if (/^\d$/.test(char)) {
                let digits = char;
                let right = grid[y]?.[x + 1];
                while (right && /\d/.test(right)) {
                    digits += right;
                    right = grid[y]?.[x + digits.length];
                    expelled.add(`${x + digits.length - 1},${y}`);
                }
                partNumbers.push({
                    startsAt: { x, y },
                    endsAt: { x: x + digits.length - 1, y },
                    number: Number.parseInt(digits, 10),
                });
            }
        }
        return partNumbers;
    };

    const getSymbols = (): GridSymbol[] => {
        const symbols: GridSymbol[] = [];
        for (const { x, y, char } of iterate()) {
            if (!/[^\d.]/.test(char)) continue;
            symbols.push({ x, y, symbol: char });
        }
        return symbols;
    };

    const getNeighbors = ({ endsAt, startsAt }: Subgrid): Neighbor[] => {
        const neighbors: Neighbor[] = [];
        for (const { x, y, char } of iterate({
            startsAt: { x: startsAt.x - 1, y: startsAt.y - 1 },
            endsAt: { x: endsAt.x + 1, y: endsAt.y + 1 },
        })) {
            if (y < 0 || y > height) continue;
            if (x < 0 || x > width) continue;
            // we don't want to include the subgrid itself
            if (x >= startsAt.x && x <= endsAt.x && y >= startsAt.y && y <= endsAt.y) continue;
            neighbors.push({ char, x, y });
        }
        return neighbors;
    };

    const numberHasRelevantNeighbors = (number: PartNumber): boolean => {
        const neighbors = getNeighbors(number);
        return neighbors.some((neighbor) => /[^\d.]/.test(neighbor.char));
    };

    const partNumbers = getPartNumbers();
    const numbersWithNeighbors = partNumbers.filter((element) =>
        numberHasRelevantNeighbors(element)
    );
    const partOneSum = numbersWithNeighbors.reduce((acc, { number }) => acc + number, 0);
    console.log('Part 1:', partOneSum);

    const symbols = getSymbols();
    const gears = symbols.filter(({ symbol }) => symbol === '*');
    const partTwoSum = gears.reduce((acc, { x, y }) => {
        const neighbors = getNeighbors({ startsAt: { x, y }, endsAt: { x, y } });
        const neighboredNumbers = partNumbers.filter((number) => {
            return neighbors.some((neighbor) => {
                return (
                    neighbor.x >= number.startsAt.x &&
                    neighbor.x <= number.endsAt.x &&
                    neighbor.y >= number.startsAt.y &&
                    neighbor.y <= number.endsAt.y
                );
            });
        });

        if (neighboredNumbers.length !== 2) return acc;
        return acc + neighboredNumbers[0]!.number * neighboredNumbers[1]!.number;
    }, 0);
    console.log('Part 2:', partTwoSum);
};
