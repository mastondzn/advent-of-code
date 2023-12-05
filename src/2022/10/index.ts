// https://adventofcode.com/2022/day/10
// https://adventofcode.com/2022/day/10/input
export const solution = (file: string): void => {
    type Instruction =
        | {
              type: 'noop';
          }
        | {
              type: 'addx';
              value: number;
          };

    type Cycle =
        | {
              type: 'none';
          }
        | { type: 'add'; value: number };

    const instructions: Instruction[] = file.split('\n').map((rawInstruction) => {
        const [type, value] = rawInstruction.split(' ');

        if (type === 'noop') {
            return { type };
        }

        if (type === 'addx') {
            if (!/^-?\d+$/.test(value!)) {
                throw new Error(`Invalid value: ${value}`);
            }
            return {
                type: 'addx',
                value: Number.parseInt(value!, 10),
            };
        }

        throw new Error(`Invalid type: ${type}`);
    });

    const cycles: Cycle[] = [];

    for (const instruction of instructions) {
        if (instruction.type === 'noop') {
            cycles.push({ type: 'none' });
        }

        if (instruction.type === 'addx') {
            cycles.push({ type: 'none' }, { type: 'add', value: instruction.value });
        }
    }

    const values: number[] = [];
    let current = 1;

    for (const cycle of cycles) {
        values.push(current);
        if (cycle.type === 'add') {
            current += cycle.value;
        }
    }

    const sumOfSignalStrengths = [20, 60, 100, 140, 180, 220]
        .map((value, index) => {
            return values[value - 1]! * (value - 1);
        })
        .reduce((acc, value) => acc + value, 0);

    console.log('The sum of the signal strengths is', sumOfSignalStrengths);
};
