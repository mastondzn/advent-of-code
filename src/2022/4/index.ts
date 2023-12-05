// https://adventofcode.com/2022/day/4
// https://adventofcode.com/2022/day/4/input
export const solution = (file: string): void => {
    type Range = [number, number];
    type Pair = [Range, Range];

    const pairs: Pair[] = file.split('\n').map((pair) => {
        const split = pair.split(',');
        const [a, b] = split[0]!.split('-').map((n) => Number.parseInt(n, 10)) as Range;
        const [c, d] = split[1]!.split('-').map((n) => Number.parseInt(n, 10)) as Range;

        return [
            [a, b],
            [c, d],
        ];
    });

    let fullyContainedCount = 0;
    let partiallyContainedCount = 0;
    for (const [[a, b], [c, d]] of pairs) {
        // part one
        const firstRangeFullyContainsSecond = a <= c && b >= d;
        const secondRangeFullyContainsFirst = c <= a && d >= b;
        if (firstRangeFullyContainsSecond || secondRangeFullyContainsFirst) {
            fullyContainedCount++;
        }

        // part two
        const firstRangePartiallyContainsSecond = a <= c && b >= c;
        const secondRangePartiallyContainsFirst = c <= a && d >= a;
        if (firstRangePartiallyContainsSecond || secondRangePartiallyContainsFirst) {
            partiallyContainedCount++;
        }
    }

    console.log('A range fully contains the other', fullyContainedCount, 'times');
    console.log('A range partially contains the other', partiallyContainedCount, 'times');
};
