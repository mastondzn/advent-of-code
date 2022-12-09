// https://adventofcode.com/2022/day/9
// https://adventofcode.com/2022/day/9/input
export const solution = (file: string): void => {
    enum Direction {
        Up = 'U',
        Down = 'D',
        Left = 'L',
        Right = 'R',
    }

    type Motion = {
        direction: Direction;
        distance: number;
    };

    type Position = {
        x: number;
        y: number;
    };

    const motions: Motion[] = file.split('\n').map((rawMotion) => {
        const [direction, distance] = rawMotion.split(' ');
        if (/[^DLRU]/.test(direction)) {
            throw new Error(`Invalid direction: ${direction}`);
        }
        if (!/^\d+$/.test(distance)) {
            throw new Error(`Invalid distance: ${distance}`);
        }
        return {
            direction: direction as Direction,
            distance: Number.parseInt(distance, 10),
        };
    });

    const headPosition: Position = {
        x: 0,
        y: 0,
    };

    const tailPosition: Position = {
        x: 0,
        y: 0,
    };

    const tailIsNeighbor = (): boolean => {
        const yDiff = Math.abs(headPosition.y - tailPosition.y);
        const xDiff = Math.abs(headPosition.x - tailPosition.x);

        const isOnTop = yDiff === 0 && xDiff === 0;
        const isHorizontally = yDiff === 0 && xDiff === 1;
        const isVertically = yDiff === 1 && xDiff === 0;
        const isDiagonal = yDiff === 1 && xDiff === 1;

        return isDiagonal || isOnTop || isHorizontally || isVertically;
    };

    const moveHead = (direction: Direction): void => {
        // eslint-disable-next-line unicorn/prefer-switch
        if (direction === Direction.Up) {
            headPosition.y += 1;
        } else if (direction === Direction.Down) {
            headPosition.y -= 1;
        } else if (direction === Direction.Left) {
            headPosition.x -= 1;
        } else if (direction === Direction.Right) {
            headPosition.x += 1;
        }
    };

    const bringTail = (): void => {
        if (headPosition.x > tailPosition.x) {
            tailPosition.x += 1;
        }
        if (headPosition.y > tailPosition.y) {
            tailPosition.y += 1;
        }
        if (headPosition.x < tailPosition.x) {
            tailPosition.x -= 1;
        }
        if (headPosition.y < tailPosition.y) {
            tailPosition.y -= 1;
        }
    };

    const headPositions: Position[] = [];
    const tailPositions: Position[] = [];

    headPositions.push({ ...headPosition });
    tailPositions.push({ ...tailPosition });

    for (const { direction, distance } of motions) {
        for (let i = 0; i < distance; i++) {
            moveHead(direction);

            // eslint-disable-next-line no-constant-condition
            while (true) {
                if (tailIsNeighbor()) {
                    break;
                }
                bringTail();
            }

            headPositions.push({ ...headPosition });
            tailPositions.push({ ...tailPosition });
        }
    }

    let placesVisited = 0;
    const currentPositions: Position[] = [];
    for (const { x, y } of tailPositions) {
        const isVisited = currentPositions.some(
            ({ x: thisX, y: thisY }) => thisX === x && thisY === y
        );

        if (!isVisited) {
            placesVisited += 1;
            currentPositions.push({ x, y });
        }
    }

    console.log(placesVisited);
};
