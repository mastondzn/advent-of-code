/* eslint-disable @typescript-eslint/no-non-null-assertion */
// https://adventofcode.com/2022/day/7
// https://adventofcode.com/2022/day/7/input
export const solution = (file: string): void => {
    type NavigateAction = { type: 'cd'; path: string };

    type File = { type: 'file'; name: string; size: number };
    type Directory = { type: 'directory'; name: string };
    type ListAction = { type: 'ls'; outputs: (File | Directory)[] };

    type Action = NavigateAction | ListAction;

    const parseOutputs = (rawOutput: string[]): (File | Directory)[] => {
        return rawOutput.filter(Boolean).map((rawOutput) => {
            const [dirOrSize, dirOrFile] = rawOutput.split(' ');

            if (dirOrSize === 'dir') {
                return { type: 'directory', name: dirOrFile! };
            }

            if (/^\d+$/.test(dirOrSize!)) {
                const parsedSize = Number.parseInt(dirOrSize!, 10);
                if (Number.isNaN(parsedSize)) throw new Error(`Invalid size: ${dirOrSize}`);

                return { type: 'file', name: dirOrFile!, size: parsedSize };
            }

            throw new Error(`Invalid output: ${rawOutput}`);
        });
    };

    const actions: Action[] = file
        .split('$ ')
        .filter(Boolean)
        .map((rawAction) => {
            const [actionWithArgument, ...rawOutput] = rawAction.split('\n');
            const [action, argument] = actionWithArgument!.split(' ');

            if (action === 'cd') {
                return { type: action, path: argument! };
            }

            if (action === 'ls') {
                const parsedOutputs = parseOutputs(rawOutput);
                return { type: action, outputs: parsedOutputs };
            }

            throw new Error(`Invalid action: ${rawAction}`);
        });

    const directorySizes: Record<string, number> = {};

    const currentPath = [];
    for (const action of actions) {
        if (action.type === 'cd') {
            if (action.path === '..') {
                currentPath.pop();
            } else {
                const isRoot = action.path === '/';
                currentPath.push(isRoot ? 'root' : action.path);
            }
        }

        if (action.type === 'ls') {
            for (const output of action.outputs) {
                if (output.type === 'directory') continue;

                const current: string[] = [];
                for (const directory of currentPath) {
                    current.push(directory);
                    const path = current.join('/');
                    directorySizes[path] = (directorySizes[path] || 0) + output.size;
                }
            }
        }
    }

    // part one
    let partOneTotal = 0;
    for (const size of Object.values(directorySizes)) {
        if (size <= 100_000) {
            partOneTotal += size;
        }
    }

    // part two
    const totalSize = 70_000_000;
    const neededSpace = 30_000_000;
    const currentUsage = directorySizes['root']!;
    const currentUnusedSpace = totalSize - currentUsage;
    const spaceToFree = neededSpace - currentUnusedSpace;

    const sortedDirectorySizes = Object.values(directorySizes).sort((a, b) => a - b);
    let partTwoDirectorySize = 0;
    for (const size of sortedDirectorySizes) {
        if (size > spaceToFree) {
            partTwoDirectorySize = size;
            break;
        }
    }

    console.log('Sum of all directories less than 100,000 in size is', partOneTotal);
    console.log('The smallest directory that can be deleted is', partTwoDirectorySize);
};
