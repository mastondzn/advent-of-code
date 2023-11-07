// https://adventofcode.com/2022/day/8
// https://adventofcode.com/2022/day/8/input
export const solution = (file: string): void => {
    type Grid = number[][];

    type Visibility = {
        height: number;
        outside: {
            top: boolean;
            bottom: boolean;
            right: boolean;
            left: boolean;
            any: boolean;
        };
        inside: {
            top: number;
            bottom: number;
            right: number;
            left: number;
            score: number;
        };
    };

    const grid: Grid = file
        .split('\n')
        .map((line) => [...line].map((char) => Number.parseInt(char, 10)));

    const getNeighborsRight = (y: number, x: number): number[] => {
        const neighbors: number[] = [];
        for (let i = x + 1; i < grid[y].length; i++) {
            neighbors.push(grid[y][i]);
        }
        return neighbors;
    };

    const getNeighborsLeft = (y: number, x: number): number[] => {
        const neighbors: number[] = [];
        for (let i = x - 1; i >= 0; i--) {
            neighbors.push(grid[y][i]);
        }
        return neighbors;
    };

    const getNeighborsTop = (y: number, x: number): number[] => {
        const neighbors: number[] = [];
        for (let i = y - 1; i >= 0; i--) {
            neighbors.push(grid[i][x]);
        }
        return neighbors;
    };

    const getNeighborsBottom = (y: number, x: number): number[] => {
        const neighbors: number[] = [];
        for (let i = y + 1; i < grid.length; i++) {
            neighbors.push(grid[i][x]);
        }
        return neighbors;
    };

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const getAmountSeen = (height: number, neighbors: number[]): number => {
        let amountSeen = 0;
        for (const neighborHeight of neighbors) {
            amountSeen++;
            if (neighborHeight >= height) break;
        }
        return amountSeen;
    };

    let amountVisibleOutside = 0;
    let biggestScoreInside = 0;

    for (const [y, row] of grid.entries()) {
        for (const [x, height] of row.entries()) {
            const neighbors = {
                top: getNeighborsTop(y, x),
                bottom: getNeighborsBottom(y, x),
                right: getNeighborsRight(y, x),
                left: getNeighborsLeft(y, x),
            };

            const outside = {
                top: neighbors.top.every((neighbor) => neighbor < height),
                bottom: neighbors.bottom.every((neighbor) => neighbor < height),
                right: neighbors.right.every((neighbor) => neighbor < height),
                left: neighbors.left.every((neighbor) => neighbor < height),
            };

            const inside = {
                top: getAmountSeen(height, neighbors.top),
                bottom: getAmountSeen(height, neighbors.bottom),
                right: getAmountSeen(height, neighbors.right),
                left: getAmountSeen(height, neighbors.left),
            };

            const visibility: Visibility = {
                height,
                outside: {
                    ...outside,
                    any: Object.values(outside).some(Boolean),
                },
                inside: {
                    ...inside,
                    score: inside.top * inside.bottom * inside.right * inside.left,
                },
            };

            if (visibility.outside.any) {
                amountVisibleOutside++;
            }

            if (visibility.inside.score > biggestScoreInside) {
                biggestScoreInside = visibility.inside.score;
            }
        }
    }

    console.log('There are', amountVisibleOutside, 'trees visible from outside the grid.');
    console.log('The biggest scenic score is', biggestScoreInside);
};
