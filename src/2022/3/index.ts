// https://adventofcode.com/2022/day/3
// https://adventofcode.com/2022/day/3/input
export const solution = (file: string): void => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const getPriority = (letter: string) => {
        const priority = `_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`.indexOf(letter);
        if (priority === -1 || letter === '_') {
            throw new Error(`Unknown letter ${letter}`);
        }
        return priority;
    };

    const rucksacks = file.split('\n');

    let partOneSum = 0;
    let partTwoSum = 0;

    // eslint-disable-next-line unicorn/no-for-loop
    for (let i = 0; i < rucksacks.length; i++) {
        // part one
        const numberOfItemsInRucksack = rucksacks[i].length;
        const leftCompartment = new Set(rucksacks[i].slice(0, numberOfItemsInRucksack / 2));
        const rightCompartment = new Set(rucksacks[i].slice(numberOfItemsInRucksack / 2));
        for (const letter of leftCompartment) {
            if (rightCompartment.has(letter)) {
                partOneSum += getPriority(letter);
            }
        }

        // part two
        if (i % 3 !== 0) continue;
        const firstRucksack = new Set(rucksacks[i]);
        const secondRucksack = new Set(rucksacks[i + 1]);
        const thirdRucksack = new Set(rucksacks[i + 2]);

        for (const letter of firstRucksack) {
            if (secondRucksack.has(letter) && thirdRucksack.has(letter)) {
                partTwoSum += getPriority(letter);
            }
        }
    }

    console.log(
        'The sum of the priorities of the items that appear in both compartments is:',
        partOneSum
    );

    console.log(
        'The sum of the priorities of the items that appear in the all of the rucksacks of each groups is:',
        partTwoSum
    );
};
