export const solution = (file: string): void => {
    type HorizontalCommand = 'forward';
    type VerticalCommand = 'up' | 'down';

    const stepOnePosition = {
        horizontal: 0,
        depth: 0,
    };

    const stepTwoPosition = {
        horizontal: 0,
        depth: 0,
        aim: 0,
    };

    const moves = (
        file.split('\n').map((move) => {
            return move.split(' ');
        }) as [HorizontalCommand | VerticalCommand, string][]
    ).map((element) => [element[0], Number.parseInt(element[1])] as const);

    for (const [direction, amount] of moves) {
        if (direction === 'forward') {
            stepOnePosition.horizontal += amount;
            stepTwoPosition.horizontal += amount;
            stepTwoPosition.depth += stepTwoPosition.aim * amount;
        }
        if (direction === 'up') {
            stepOnePosition.depth -= amount;
            stepTwoPosition.aim -= amount;
        }
        if (direction === 'down') {
            stepOnePosition.depth += amount;
            stepTwoPosition.aim += amount;
        }
    }

    console.log(
        'If we multiply the horizontal and vertical position for step one, we get',
        stepOnePosition.horizontal * stepOnePosition.depth
    );

    console.log(
        'If we multiply the horizontal and depth position for step two, we get',
        stepTwoPosition.horizontal * stepTwoPosition.depth
    );
};
