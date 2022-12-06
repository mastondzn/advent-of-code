// https://adventofcode.com/2022/day/6
// https://adventofcode.com/2022/day/6/input
export const solution = (file: string): void => {
    const getProcessedCount = (uniqueCharactersNeeded: number): number => {
        let brokeOut = false;
        let current = '';
        let processed: number;
        for (processed = 0; processed < file.length; processed++) {
            const character = file[processed];
            current += character;
            if (current.length < uniqueCharactersNeeded) continue;

            const last = current.slice(-uniqueCharactersNeeded);
            const unique = new Set(last);
            if (unique.size === uniqueCharactersNeeded) {
                brokeOut = true;
                break;
            }
        }
        if (!brokeOut) throw new Error('No solution found');
        return processed + 1;
    };

    console.log(getProcessedCount(4), 'characters need to be processed for start-of-packet');
    console.log(getProcessedCount(14), 'characters need to be processed for start-of-message');
};
