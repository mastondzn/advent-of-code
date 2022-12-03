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
    const compartments = rucksacks.map((rucksack) => {
        const half = rucksack.length / 2;

        if (!Number.isInteger(half)) {
            console.log(rucksack);
            throw new Error('Invalid rucksack');
        }

        const left = rucksack.slice(0, half);
        const right = rucksack.slice(half);
        return [left, right] as const;
    });

    const listOfItemsThatAppearInBothCompartments = compartments.map(([left, right]) => {
        for (const leftLetter of left) {
            for (const rightLetter of right) {
                if (leftLetter === rightLetter) {
                    return leftLetter;
                }
            }
        }
        throw new Error('No item appears in both compartments');
    });

    // eslint-disable-next-line unicorn/no-array-reduce
    const sumOfPriorities = listOfItemsThatAppearInBothCompartments.reduce((sum, item) => {
        const priority = Priorities[item as keyof typeof Priorities];
        return sum + priority;
    }, 0);

    console.log(
        'The sum of the priorities of the items that appear in both compartments is:',
        sumOfPriorities
    );

    type Group = readonly [string, string, string];
    const groups: Group[] = [];

    for (let i = 0; i < rucksacks.length; i++) {
        if ((i + 1) % 3 !== 1) continue;
        const group = [rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]] as const;
        groups.push(group);
    }

    const listOfItemsThatAppearInEachRucksackForEveryGroup = groups.map(
        ([rucksack1, rucksack2, rucksack3]) => {
            for (const letter of rucksack1) {
                if (rucksack2.includes(letter) && rucksack3.includes(letter)) {
                    return letter;
                }
            }
            throw new Error('No item appears in each rucksack for this group.');
        }
    );

    // eslint-disable-next-line unicorn/no-array-reduce
    const sumOfGroupPriorities = listOfItemsThatAppearInEachRucksackForEveryGroup.reduce(
        (sum, item) => {
            const priority = Priorities[item as keyof typeof Priorities];
            return sum + priority;
        },
        0
    );

    console.log(
        'The sum of the priorities of the items that appear in the all of the rucksacks of each groups is:',
        sumOfGroupPriorities
    );
};

void main();
