/* eslint-disable @typescript-eslint/no-non-null-assertion */
// https://adventofcode.com/2020/day/2
// https://adventofcode.com/2020/day/2/input
export const solution = (file: string): void => {
    type Policy = {
        range: { left: number; right: number };
        letter: string;
        password: string;
    };

    const policies: Policy[] = file.split('\n').map((line) => {
        const [range, letter, password] = line.split(' ');
        if (!range || !letter || !password) throw new Error('Invalid input.');

        const [left, right] = range.split('-').map((value) => Number.parseInt(value, 10));
        if (!left || !right) throw new Error('Invalid input.');

        return {
            range: { left, right },
            letter: letter.replace(':', ''),
            password,
        };
    });

    let validPasswordCount = 0;
    for (const { range, letter, password } of policies) {
        let letterCount = 0;
        for (const char of password) {
            if (char === letter) letterCount++;
        }

        if (letterCount >= range.left && letterCount <= range.right) {
            validPasswordCount++;
        }
    }

    let validPasswordCount2 = 0;
    for (const { range, letter, password } of policies) {
        const left = password[range.left - 1];
        const right = password[range.right - 1];

        if ((left === letter || right === letter) && left !== right) {
            validPasswordCount2++;
        }
    }

    console.log('Part 1:', validPasswordCount);
    console.log('Part 2:', validPasswordCount2);
};
