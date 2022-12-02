import { mkdir, readFile, writeFile } from 'node:fs/promises';

import chalk from 'chalk';

import { validateArgs } from './utils';

const main = async () => {
    const year = process.argv[2];
    const day = process.argv[3];

    if (!validateArgs(year, day)) {
        return;
    }

    const existingFile = !!(await readFile(`./src/${year}/${day}/index.ts`, 'utf8').catch(
        () => false
    ));
    if (existingFile) {
        console.log(`Files for year ${year}, day ${day} already exist!`);
        return;
    }

    const txt = `
    import { readFile } from 'node:fs/promises';
        
    // https://adventofcode.com/${year}/day/${day}
    // https://adventofcode.com/${year}/day/${day}/input
    const main = async () => {
        const input = await readFile('./src/${year}/${day}/input.txt', 'utf8');

        // Solve the puzzle here! Don't forget to add your input file to input.txt.
    };

    void main();
    `
        .replace(/^ {4}/gm, '')
        .trimStart();

    await mkdir(`./src/${year}/${day}`, { recursive: true });

    const codeFile = `./src/${year}/${day}/index.ts`;
    const inputFile = `./src/${year}/${day}/input.txt`;

    await Promise.all([
        writeFile(codeFile, txt, { encoding: 'utf8' }),
        writeFile(inputFile, '', { encoding: 'utf8' }),
    ]);

    const lines = [
        `Done! Scaffolded files for year ${year}, day ${day}.`,
        `Paste your puzzle input into ${chalk.yellow(inputFile)}`,
        `Then you can start editing ${chalk.yellow(codeFile)}!`,
        `Run ${chalk.bgBlue(
            `\`pnpm dev ${year} ${day}\``
        )} to run your solution and watch for changes.`,
        `Happy advent of code!`,
        ``,
        chalk.blue(`https://adventofcode.com/${year}/day/${day}`),
        chalk.blue(`https://adventofcode.com/${year}/day/${day}/input`),
    ];

    console.log(lines.join('\n'));
};

void main();
