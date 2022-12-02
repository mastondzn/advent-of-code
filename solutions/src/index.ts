import { readFile } from 'node:fs/promises';

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
            `File for year ${year}, day ${day} does not exist! You can scaffold it with \`pnpm scaffold ${year} ${day}\``
        );
        return;
    }
    await import(`./${year}/${day}`);
};

void main();
