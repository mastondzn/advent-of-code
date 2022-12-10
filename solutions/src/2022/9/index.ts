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

    const bring = (child: Position, parent: Position): Position => {
        if (parent.x > child.x) {
            child.x += 1;
        }
        if (parent.y > child.y) {
            child.y += 1;
        }
        if (parent.x < child.x) {
            child.x -= 1;
        }
        if (parent.y < child.y) {
            child.y -= 1;
        }
        return child;
    };

    const solve = (extraKnots = 0): number => {
        // first is the head, middle are extra knots, last is the tail
        const knots: Position[] = [
            { x: 0, y: 0 },
            ...Array.from({ length: extraKnots }, () => ({ x: 0, y: 0 })),
            { x: 0, y: 0 },
        ];

        // helper array to store tail positions
        const tailHistory: Position[] = [];

        for (const { direction, distance } of motions) {
            for (let i = 0; i < distance; i++) {
                // move head
                knots[0] = move(knots[0], direction);

                // change children positions
                // for every child we need to check if its neighboring with the parent
                // first is the head, so we dont need to check or move it
                for (let j = 1; j < knots.length; j++) {
                    if (!areNeighboring(knots[j], knots[j - 1])) {
                        knots[j] = bring(knots[j], knots[j - 1]);
                    }

                    // if its the last child its the tail, so push current position to helper array
                    if (j === knots.length - 1) {
                        tailHistory.push({ ...knots[j] });
                    }
                }
            }
        }

        return new Set(tailHistory.map(({ x, y }) => `${x},${y}`)).size;
    };

    console.log('The tail visits', solve(), 'positions in part one');
    console.log('The tail visits', solve(8), 'positions in part two');
};
