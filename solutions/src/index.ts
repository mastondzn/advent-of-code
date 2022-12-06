import { readFile } from 'node:fs/promises';

import chalk from 'chalk';

import { validateArgs } from './utils';

const main = async () => {
    const year = process.argv[2];
    const day = process.argv[3];

    if (!validateArgs(year, day)) {
        return;
    }

    const file = `./src/${year}/${day}/index.ts`;
    const hasDay = !!(await readFile(file, 'utf8').catch(() => false));
    if (!hasDay) {
        console.log(
            `Files for year ${year}, day ${day} do not exist! You can scaffold them with ${chalk.bgBlue(
                `\`pnpm scaffold ${year} ${day}\``
            )}`
        );
        return;
    }

    const preInputReadTime = performance.now();

    let input: string;
    try {
        input = await readFile(`./src/${year}/${day}/input.txt`, 'utf8');
        if (input.length === 0 || /^\s+$/.test(input)) {
            throw new Error('Input file is empty.');
        }
    } catch (error) {
        console.error(`Failed to read input file for year ${year}, day ${day}.`);
        console.error(error);
        return;
    }

    const preImportTime = performance.now();

    const exports = (await import(`./${year}/${day}`)) as {
        solution: (file: string) => void | Promise<void>;
    };

    if (typeof exports?.solution !== 'function') {
        console.log(`No solution export found in ${file}`);
        return;
    }

    const preSolutionTime = performance.now();

    try {
        const maybePromise = exports.solution(input);
        if (maybePromise instanceof Promise) {
            await maybePromise;
        }
    } catch (error) {
        console.log(`Error running solution for year ${year}, day ${day}:`);
        console.error(error);
    }

    const postSolutionTime = performance.now();

    const inputFileReadTook = `${(preImportTime - preInputReadTime).toFixed(2)}ms`;
    const importTook = `${(preSolutionTime - preImportTime).toFixed(2)}ms`;
    const solutionTook = `${(postSolutionTime - preSolutionTime).toFixed(2)}ms`;

    const timings = [
        `Input file read: ${inputFileReadTook}`,
        `Import: ${importTook}`,
        `Solution: ${solutionTook}`,
    ].join(' / ');

    console.log(chalk.black(timings));
};

void main();
