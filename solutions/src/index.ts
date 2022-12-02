import { readFile } from 'node:fs/promises';

const main = async () => {
    const arg = process.argv[2];
    if (!arg) {
        console.log('Please provide a day (for example pnpm dev 1 or pnpm start 1)');
        return;
    }
    if (!/^[1-9]+$/.test(arg)) {
        console.log('Please provide a valid day (for example pnpm dev 1 or pnpm start 1)');
        return;
    }
    const file = `./src/${arg}/index.ts`;
    const hasDay = !!(await readFile(file, 'utf8').catch(() => false));
    if (!hasDay) {
        console.log(`File for day ${arg} does not exist!`);
        return;
    }
    await import(`./${arg}`);
};

void main();
