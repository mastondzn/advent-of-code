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

    const areNeighboring = (position1: Position, position2: Position): boolean => {
        const yDiff = Math.abs(position1.y - position2.y);
        const xDiff = Math.abs(position1.x - position2.x);

        const isOnTop = yDiff === 0 && xDiff === 0;
        const isHorizontallyNeighboring = yDiff === 0 && xDiff === 1;
        const isVerticallyNeighboring = yDiff === 1 && xDiff === 0;
        const isDiagonallyNeighboring = yDiff === 1 && xDiff === 1;

        return (
            isDiagonallyNeighboring ||
            isOnTop ||
            isHorizontallyNeighboring ||
            isVerticallyNeighboring
        );
    };

    const move = (position: Position, direction: Direction): Position => {
        switch (direction) {
            case Direction.Up: {
                position.y += 1;
                break;
            }
            case Direction.Down: {
                position.y -= 1;
                break;
            }
            case Direction.Left: {
                position.x -= 1;
                break;
            }
            case Direction.Right: {
                position.x += 1;
                break;
            }
        }
        return position;
    };

    const bring = (childPosition: Position, parentPosition: Position): Position => {
        if (parentPosition.x > childPosition.x) {
            childPosition.x += 1;
        }
        if (parentPosition.y > childPosition.y) {
            childPosition.y += 1;
        }
        if (parentPosition.x < childPosition.x) {
            childPosition.x -= 1;
        }
        if (parentPosition.y < childPosition.y) {
            childPosition.y -= 1;
        }
        return childPosition;
    };

    const solve = (knots = 0): number => {
        const children: Position[] = Array.from({ length: knots }, () => ({ x: 0, y: 0 }));

        // first is the head, middle are knots, last is the tail
        const currentPositions: Position[] = [{ x: 0, y: 0 }, ...children, { x: 0, y: 0 }];

        const tailPositions: Position[] = [];
        for (const { direction, distance } of motions) {
            for (let i = 0; i < distance; i++) {
                // move head
                currentPositions[0] = move(currentPositions[0], direction);

                // change children positions
                // for every child we need to check if its neighboring with the parent
                // first is the head, so we dont need to check or move it
                for (let j = 1; j < currentPositions.length; j++) {
                    // eslint-disable-next-line no-constant-condition
                    while (true) {
                        if (areNeighboring(currentPositions[j], currentPositions[j - 1])) break;
                        currentPositions[j] = bring(currentPositions[j], currentPositions[j - 1]);
                    }

                    // if its the last child its the tail, so push current position to helper array
                    if (j === currentPositions.length - 1) {
                        tailPositions.push({ ...currentPositions[j] });
                    }
                }
            }
        }

        return new Set(tailPositions.map((position) => `${position.x},${position.y}`)).size;
    };

    console.log(solve());
    console.log(solve(8));
};
