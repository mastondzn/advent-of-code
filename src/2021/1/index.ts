/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const solution = (file: string): void => {
    const numbers = file.split('\n').map((number) => Number.parseInt(number, 10));

    let numberOfIncreasesInStepOne = 0;
    let numberOfIncreasesInStepTwo = 0;
    let previous: readonly [number, number, number] | undefined;
    for (let i = 0; i < numbers.length; i++) {
        // step one
        if (i === 0) continue;
        const [numberOne, numberTwo] = [numbers[i - 1]!, numbers[i]!] as const;
        if (numberTwo > numberOne) numberOfIncreasesInStepOne++;

        // step two
        if (i === 0 || i === 1) continue;
        const current = [numbers[i - 2]!, numbers[i - 1]!, numbers[i]!] as const;
        if (previous) {
            const previousSum = previous.reduce((a, b) => a + b, 0);
            const currentSum = current.reduce((a, b) => a + b, 0);
            if (currentSum > previousSum) numberOfIncreasesInStepTwo++;
        }
        previous = current;
    }

    console.log('Depth increased', numberOfIncreasesInStepOne, 'times with first step algorithm.');
    console.log('Depth increased', numberOfIncreasesInStepTwo, 'times with second step algorithm.');
};
