import { readFile } from 'node:fs/promises';

// https://adventofcode.com/2022/day/3
// https://adventofcode.com/2022/day/3/input
const main = async () => {
    const input = await readFile('./src/2022/3/input.txt', 'utf8');

    enum Priorities {
        _,
        a,
        b,
        c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u,
        v,
        w,
        x,
        y,
        z,
        A,
        B,
        C,
        D,
        E,
        F,
        G,
        H,
        I,
        J,
        K,
        L,
        M,
        N,
        O,
        P,
        Q,
        R,
        S,
        T,
        U,
        V,
        W,
        X,
        Y,
        Z,
    }

    const rucksacks = input.split('\n');

    let partOneSum = 0;
    let partTwoSum = 0;

    // eslint-disable-next-line unicorn/no-for-loop
    for (let i = 0; i < rucksacks.length; i++) {
        // part one
        const numberOfItems = rucksacks[i].length;
        const left = new Set(rucksacks[i].slice(0, numberOfItems / 2));
        const right = new Set(rucksacks[i].slice(numberOfItems / 2));
        for (const letter of left) {
            if (right.has(letter)) {
                partOneSum += Priorities[letter as keyof typeof Priorities];
            }
        }

        // part two
        if ((i + 1) % 3 !== 1) continue;
        const [firstRucksack, secondRucksack, thirdRucksack] = [
            new Set(rucksacks[i]),
            new Set(rucksacks[i + 1]),
            new Set(rucksacks[i + 2]),
        ] as const;

        for (const letter of firstRucksack) {
            if (secondRucksack.has(letter) && thirdRucksack.has(letter)) {
                partTwoSum += Priorities[letter as keyof typeof Priorities];
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

void main();
