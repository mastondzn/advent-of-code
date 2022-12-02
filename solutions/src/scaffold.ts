import { mkdir, readFile, writeFile } from 'node:fs/promises';

const main = async () => {
    const arg = process.argv[2];
    if (!arg) {
        console.log('Please provide a day (for example pnpm scaffold 7)');
        return;
    }
    if (!/^[1-9]+$/.test(arg)) {
        console.log('Please provide a valid day (for example pnpm scaffold 7)');
        return;
    }
    const existingFile = !!(await readFile(`./src/${arg}/index.ts`, 'utf8').catch(() => false));
    if (existingFile) {
        console.log(`File for day ${arg} already exists!`);
        return;
    }

    const txt = `
    import { readFile } from 'node:fs/promises';
        
    const main = async () => {
        const input = await readFile('./src/${arg}/input.txt', 'utf8');

        // Your code here, remember to add your input file to input.txt.
        // https://adventofcode.com/2022/day/${arg}
    };

    void main();
    `
        .replace(/^ {4}/gm, '')
        .trimStart();

    await mkdir(`./src/${arg}`, { recursive: true });

    await Promise.all([
        writeFile(`./src/${arg}/index.ts`, txt, { encoding: 'utf8' }),
        writeFile(`./src/${arg}/input.txt`, '', { encoding: 'utf8' }),
    ]);

    console.log(`Done! You can now start working on your solution. (pnpm dev ${arg})`);
};

void main();
