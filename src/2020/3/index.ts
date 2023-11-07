/* eslint-disable @typescript-eslint/no-non-null-assertion */
// https://adventofcode.com/2020/day/3
// https://adventofcode.com/2020/day/3/input
export const solution = (file: string): void => {
    const grid: ('.' | '#')[][] = file.split('\n').map((line) => [...line] as ('.' | '#')[]);

    const traverse = (right: number, down: number): number => {
        let x = 0;
        let y = 0;
        let treeCount = 0;

        while (y < grid.length) {
            if (grid[y]![x]! === '#') {
                treeCount++;
            }

            x = (x + right) % grid[y]!.length;
            y += down;
        }

        return treeCount;
    };

    const part1 = traverse(3, 1);
    const part2 = traverse(1, 1) * part1 * traverse(5, 1) * traverse(7, 1) * traverse(1, 2);

    console.log('Part 1:', part1);
    console.log('Part 2:', part2);
};
