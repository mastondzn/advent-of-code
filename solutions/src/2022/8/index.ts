// https://adventofcode.com/2022/day/8
// https://adventofcode.com/2022/day/8/input
export const solution = (file: string): void => {
    type Grid = number[][];

    type OutsideVisibility = {
        height: number;
        isVisibleTop: boolean;
        isVisibleBottom: boolean;
        isVisibleRight: boolean;
        isVisibleLeft: boolean;
        isVisibleAnyWay: boolean;
    };
    type OutsideVisibilities = OutsideVisibility[][];

    type InsideVisibility = {
        height: number;
        amountSeenTop: number;
        amountSeenBottom: number;
        amountSeenRight: number;
        amountSeenLeft: number;
        scenicScore: number;
    };
    type InsideVisibilities = InsideVisibility[][];

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

    // part one
    const outsideVisibilities: OutsideVisibilities = grid.map((row, y) => {
        return row.map((height, x) => {
            const topNeighbors = getNeighborsTop(y, x);
            const bottomNeighbors = getNeighborsBottom(y, x);
            const rightNeighbors = getNeighborsRight(y, x);
            const leftNeighbors = getNeighborsLeft(y, x);

            const visibility = {
                isVisibleTop: topNeighbors.every((neighbor) => neighbor < height),
                isVisibleBottom: bottomNeighbors.every((neighbor) => neighbor < height),
                isVisibleRight: rightNeighbors.every((neighbor) => neighbor < height),
                isVisibleLeft: leftNeighbors.every((neighbor) => neighbor < height),
            };

            return {
                ...visibility,
                height,
                isVisibleAnyWay:
                    visibility.isVisibleTop ||
                    visibility.isVisibleBottom ||
                    visibility.isVisibleRight ||
                    visibility.isVisibleLeft,
            };
        });
    });

    const visibleCount = outsideVisibilities
        .map((row) =>
            // eslint-disable-next-line unicorn/no-array-reduce
            row.reduce(
                (current, { isVisibleAnyWay }) => (isVisibleAnyWay ? current + 1 : current),
                0
            )
        )
        .reduce((current, count) => current + count, 0);

    // part two
    const insideVisibilities: InsideVisibilities = grid.map((row, y) => {
        return row.map((height, x) => {
            const topNeighbors = getNeighborsTop(y, x);
            const bottomNeighbors = getNeighborsBottom(y, x);
            const rightNeighbors = getNeighborsRight(y, x);
            const leftNeighbors = getNeighborsLeft(y, x);

            const getAmountSeen = (neighbors: number[]): number => {
                let amountSeen = 0;
                for (const neighborHeight of neighbors) {
                    amountSeen++;
                    if (neighborHeight >= height) break;
                }
                return amountSeen;
            };

            const amounts = {
                amountSeenTop: getAmountSeen(topNeighbors),
                amountSeenBottom: getAmountSeen(bottomNeighbors),
                amountSeenRight: getAmountSeen(rightNeighbors),
                amountSeenLeft: getAmountSeen(leftNeighbors),
            };

            return {
                ...amounts,
                height,
                scenicScore:
                    amounts.amountSeenTop *
                    amounts.amountSeenBottom *
                    amounts.amountSeenRight *
                    amounts.amountSeenLeft,
            };
        });
    });

    let biggestScenicScore = 0;
    for (const row of insideVisibilities) {
        for (const { scenicScore } of row) {
            if (scenicScore > biggestScenicScore) {
                biggestScenicScore = scenicScore;
            }
        }
    }

    console.log('There are', visibleCount, 'trees visible from outside the grid.');
    console.log('The biggest scenic score is', biggestScenicScore);
};
