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

    const instructions: Instruction[] = file.split('\n').map((rawInstruction) => {
        const [type, value] = rawInstruction.split(' ');
        if (type === 'noop') {
            return { type };
        }
        if (type === 'addx') {
            if (!/^-?\d+$/.test(value)) {
                throw new Error(`Invalid value: ${value}`);
            }
            return {
                type: 'addx',
                value: Number.parseInt(value, 10),
            };
        }
        throw new Error(`Invalid type: ${type}`);
    });

    const cycles: number[] = [];

    for (const instruction of instructions) {
        if (instruction.type === 'noop') {
            cycles.push(0, 0);
        }

        if (instruction.type === 'addx') {
            cycles.push(instruction.value, 0);
        }
    }

    console.log(cycles);
    // Solve the puzzle here! Don't forget to add your input file to input.txt.
};
