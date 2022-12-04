import { readFile } from 'node:fs/promises';

// https://adventofcode.com/2022/day/4
// https://adventofcode.com/2022/day/4/input
const main = async () => {
    const input = await readFile('./src/2022/4/input.txt', 'utf8');

    type Range = [number, number];
    type Pair = [Range, Range];

    const pairs: Pair[] = input.split('\n').map((pair) => {
        const split = pair.split(',');
        const [a, b] = split[0].split('-').map((n) => Number.parseInt(n, 10));
        const [c, d] = split[1].split('-').map((n) => Number.parseInt(n, 10));

        return [
            [a, b],
            [c, d],
        ];
    });

    let timesARangeFullyContainsTheOther = 0;
    let timesARangePartiallyContainsTheOther = 0;
    for (const pair of pairs) {
        const [[a, b], [c, d]] = pair;

        // part one
        const firstPairFullyContainsTheSecond = a <= c && b >= d;
        const secondPairFullyContainsTheFirst = c <= a && d >= b;
        if (firstPairFullyContainsTheSecond || secondPairFullyContainsTheFirst) {
            timesARangeFullyContainsTheOther++;
        }

        // part two
        const firstPairPartiallyContainsTheSecond = a <= c && b >= c;
        const secondPairPartiallyContainsTheFirst = c <= a && d >= a;
        if (firstPairPartiallyContainsTheSecond || secondPairPartiallyContainsTheFirst) {
            timesARangePartiallyContainsTheOther++;
        }
    }

    console.log('A range fully contains the other', timesARangeFullyContainsTheOther, 'times');
    console.log(
        'A range partially contains the other',
        timesARangePartiallyContainsTheOther,
        'times'
    );
};

void main();
