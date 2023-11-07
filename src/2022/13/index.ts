import { equals } from 'ramda';
import { z } from 'zod';

// https://adventofcode.com/2022/day/13
// https://adventofcode.com/2022/day/13/input
export const solution = (file: string): void => {
    type DeepArray = (number | DeepArray)[];
    type Pair = { left: DeepArray; right: DeepArray };

    const deepArraySchema: z.ZodType<DeepArray> = z.lazy(() =>
        z.array(z.number().or(deepArraySchema))
    );

    const pairs: Pair[] = file.split('\n\n').map((rawPair) => {
        const [rawLeft, rawRight] = rawPair.split('\n');

        const left = deepArraySchema.parse(JSON.parse(rawLeft));
        const right = deepArraySchema.parse(JSON.parse(rawRight));

        return { left, right };
    });

    const compare = (left: number | DeepArray, right: number | DeepArray): number => {
        if (typeof left === 'number' && typeof right === 'number') {
            return left === right ? 0 : left < right ? -1 : 1;
        } else if (typeof left === 'number' && Array.isArray(right)) {
            return compare([left], right);
        } else if (typeof right === 'number' && Array.isArray(left)) {
            return compare(left, [right]);
        } else if (Array.isArray(left) && Array.isArray(right)) {
            const minLength = Math.min(left.length, right.length);
            for (let i = 0; i < minLength; i++) {
                const compared = compare(left[i], right[i]);
                if (compared !== 0) return compared;
            }
            return left.length - right.length;
        }
        throw new Error('Bad input.');
    };

    let partOneSum = 0;
    for (const [i, { left, right }] of pairs.entries()) {
        const compared = compare(left, right);
        if (compared < 0) {
            partOneSum += i + 1;
        }
    }

    const packets = pairs.flatMap(({ left, right }) => [left, right]);
    packets.push([[2]], [[6]]);
    packets.sort(compare);

    let partTwoSum = 1;
    for (const [i, packet] of packets.entries()) {
        if (equals(packet, [[2]]) || equals(packet, [[6]])) {
            partTwoSum *= i + 1;
        }
    }

    console.log('The sum of the indices that are in the right order is', partOneSum);
    console.log('The decoder key is', partTwoSum);
};
