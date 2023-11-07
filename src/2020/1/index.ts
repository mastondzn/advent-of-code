// https://adventofcode.com/2020/day/1
// https://adventofcode.com/2020/day/1/input
export const solution = (file: string): void => {
    const numbers = file.split('\n').map((line) => Number.parseInt(line, 10));

    const first = (): number => {
        for (const [index, value] of numbers.entries()) {
            for (const [index2, value2] of numbers.entries()) {
                if (index === index2) {
                    continue;
                }

                if (value + value2 === 2020) {
                    return value * value2;
                }
            }
        }
        throw new Error('No solution found.');
    };

    const second = (): number => {
        for (const [index, value] of numbers.entries()) {
            for (const [index2, value2] of numbers.entries()) {
                for (const [index3, value3] of numbers.entries()) {
                    if (index === index2 || index === index3 || index2 === index3) {
                        continue;
                    }

                    if (value + value2 + value3 === 2020) {
                        return value * value2 * value3;
                    }
                }
            }
        }
        throw new Error('No solution found.');
    };

    console.log('Part 1:', first());
    console.log('Part 2:', second());
};
