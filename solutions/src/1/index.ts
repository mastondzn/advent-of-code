import { readFile } from 'node:fs/promises';

const main = async () => {
    const input = await readFile('./src/1/input.txt', 'utf8');

    const elves = input
        .split('\n\n')
        .map((elf) => {
            const foods = elf.split('\n');
            let total = 0;

            for (const calories of foods) {
                total += Number.parseInt(calories, 10);
            }

            return total;
        })
        .sort();

    const mostCalories = elves.at(-1);
    const topThreeMostCaloriesTotal = elves.slice(-3).reduce((a, b) => a + b, 0);

    console.log({ mostCalories, topThreeMostCaloriesTotal });
};

void main();
