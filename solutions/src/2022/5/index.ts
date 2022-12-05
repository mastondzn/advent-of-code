import { readFile } from 'node:fs/promises';

import chalk from 'chalk';
import { clone, transpose } from 'ramda';

// https://adventofcode.com/2022/day/5
// https://adventofcode.com/2022/day/5/input
const main = async () => {
    const input = await readFile('./src/2022/5/input.txt', 'utf8');

    const [rawStacksInput, rawMovesInput] = input.split('\n\n');

    const rawStackLines = rawStacksInput.split('\n');
    // pop last line that labels the stacks
    rawStackLines.pop();

    // split lines as they are
    const rawStackChars = rawStackLines.map((e) => {
        const split = e.split(/ {1,4}/gm);
        return split.map((e) => {
            // eslint-disable-next-line unicorn/better-regex
            if (e) return e.replace(/\[|\]/gm, '');
            return;
        });
    });

    // transpose the matrix to get the stacks, remove undefined values and reverse the order
    const stacks = transpose(rawStackChars).map((e) => e.filter(Boolean).reverse()) as string[][];

    type Move = [number, [number, number]];
    const moves: Move[] = rawMovesInput.split('\n').map((e) => {
        const numbers = e
            .replace(/[A-Za-z]+\s/gm, '')
            .split(' ')
            .map((e) => {
                const parsed = Number.parseInt(e, 10);
                if (Number.isNaN(parsed)) throw new Error('Invalid input');
                return parsed;
            });

        const amount = numbers[0];
        // from/to are 1-indexed
        const from = numbers[1] - 1;
        const to = numbers[2] - 1;

        return [amount, [from, to]];
    });

    // part one
    const partOneStacks = clone(stacks);
    // eslint-disable-next-line prefer-const
    for (let [amount, [from, to]] of moves) {
        const givingStack = partOneStacks[from];
        const receivingStack = partOneStacks[to];
        while (amount > 0) {
            const top = givingStack.pop();
            if (!top) break;
            receivingStack.push(top);
            amount--;
        }
    }

    // part two
    const partTwoStacks = clone(stacks);
    for (const [amount, [from, to]] of moves) {
        const givingStack = partTwoStacks[from];
        const receivingStack = partTwoStacks[to];

        const top = givingStack.slice(-amount);
        givingStack.splice(-amount, amount);
        receivingStack.push(...top);
    }

    const cratesOnTopPartOne = partOneStacks.map((e) => e.at(-1)).join('');
    const cratesOnTopPartTwo = partTwoStacks.map((e) => e.at(-1)).join('');

    console.log(
        'The crates on top of each stack after instructions using CrateMover 9000 are',
        chalk.blue(cratesOnTopPartOne)
    );
    console.log(
        'The crates on top of each stack after instructions using CrateMover 9001 are',
        chalk.blue(cratesOnTopPartTwo)
    );
};

void main();
