/* eslint-disable unicorn/no-array-reduce */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
// https://adventofcode.com/2023/day/1
// https://adventofcode.com/2023/day/1/input
export const solution = (file: string): void => {
    const lines = file.split('\n');

    const numberMap: Record<string, string> = {
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9',
    };

    const getWord = (number: string): string | undefined => {
        return Object.entries(numberMap).find(([key]) => key === number)?.[1];
    };

    const numberWords = Object.keys(numberMap);
    const numberWordsLengths = //
        [...new Set(numberWords.map((word) => word.length))].sort((a, b) => b - a);

    const replaceLeft = (line: string): string => {
        for (let i = 0; i < line.length; i++) {
            for (const length of numberWordsLengths) {
                const substring = line.slice(i, i + length);
                const word = getWord(substring);
                if (word) {
                    return `${line.slice(0, i)}${word}${line.slice(i + length)}`;
                }
            }
        }
        return line;
    };

    const replaceRight = (line: string): string => {
        for (let i = line.length; i > 0; i--) {
            for (const length of numberWordsLengths) {
                const substring = line.slice(i - length, i);
                const word = getWord(substring);
                if (word) {
                    return `${line.slice(0, i - length)}${word}${line.slice(i)}`;
                }
            }
        }
        return line;
    };

    const solve = (withWords = false): number => {
        let sum = 0;

        for (let line of lines) {
            const ogLine = line;
            if (withWords) {
                line = replaceLeft(line);
                line = replaceRight(line);
            }

            const numbers = line.replaceAll(/\D/g, '');
            const left = numbers.at(0);
            const right = numbers.at(-1);
            if (!left || !right) {
                throw new Error('No left or right');
            }
            const number = Number.parseInt(`${left}${right}`, 10);
            console.log({ ogLine, line, number, left, right });
            sum += number;
        }
        return sum;
    };

    console.log('Part 1 sum:', solve());
    console.log('Part 2 sum:', solve(true));
};
