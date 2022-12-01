import { readFile } from 'node:fs/promises';

const main = async () => {
    const input = await readFile('./src/input.txt', 'utf8');

    const mostCalories = input
        .split('\n\n')
        .map((elf) => {
            const foods = elf.split('\n');
            let total = 0;

            for (const calories of foods) {
                total += Number.parseInt(calories, 10);
            }

            return total;
        })
        .sort()
        .at(-1);

    console.log(mostCalories);
};

void main();
