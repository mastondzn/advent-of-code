export const solution = (file: string): void => {
    const bitsColumnMap: Record<string, number> = {};

    const lines = file.split('\n');

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const line = lines[lineIndex];

        for (let columnIndex = 0; columnIndex < line!.length; columnIndex++) {
            const BIT = Number.parseInt(lines[lineIndex]![columnIndex]!, 10);

            if (!bitsColumnMap[columnIndex]) {
                bitsColumnMap[columnIndex] = 0;
            }

            bitsColumnMap[columnIndex] += BIT;
        }
    }

    let gammaRateAsBinaryString = '';
    let epsilonRateAsBinaryString = '';
    for (const [, bitTotalForColumn] of Object.entries(bitsColumnMap)) {
        const average = bitTotalForColumn / lines.length;
        const rounded = Math.round(average);

        gammaRateAsBinaryString += rounded ? '1' : '0';
        epsilonRateAsBinaryString += rounded ? '0' : '1';
    }

    const gammaRate = Number.parseInt(gammaRateAsBinaryString, 2);
    const epsilonRate = Number.parseInt(epsilonRateAsBinaryString, 2);

    console.log('The power consumption is', gammaRate * epsilonRate);

    // step 2 pretty dank
    // const maxColumnIndex = Math.max(
    //     ...Object.keys(bitsColumnMap).map((key) => Number.parseInt(key, 10))
    // );

    // let oxygenSearch = [...lines];
    // let oxygenSearchColumnIndex = 0;
    // while (oxygenSearchColumnIndex < maxColumnIndex) {
    //     oxygenSearch = oxygenSearch.filter((line) => {
    //         const currentColumnRounded = Math.round(bitsColumnMap);

    //         if (bitsColumnMap[oxygenSearchColumnIndex] === 0) {
    //             return false;
    //         }
    //     });
    //     oxygenSearchColumnIndex++;
    // }

    // const scrubberSearch = [...lines];
    // let oxygenSearchColumnIndex = 0;

    // Your code here, remember to add your input file to input.txt.
    // https://adventofcode.com/2021/day/3
    // https://adventofcode.com/2021/day/3/input
};
