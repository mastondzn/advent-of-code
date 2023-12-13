// https://adventofcode.com/2023/day/6
// https://adventofcode.com/2023/day/6/input
export const solution = (file: string): void => {
    const [rawTimes, rawDistances] = file.split('\n');
    if (!rawTimes || !rawDistances) throw new Error('Invalid input');

    const [, ...distances] = rawDistances.split(/\s+/).map((x) => Number.parseInt(x, 10));
    const [, ...times] = rawTimes.split(/\s+/).map((x) => Number.parseInt(x, 10));

    type Race = { time: number; distance: number };

    const races: Race[] = [];
    for (const [i, distance] of distances.entries()) {
        races.push({ time: times[i]!, distance });
    }

    const determineWinningSpeedsCount = ({ distance, time }: Race): number => {
        const winningSpeeds: number[] = [];
        for (let speed = 0; speed < time; speed++) {
            const timeLeft = time - speed;
            const distanceTravelled = speed * timeLeft;
            if (distanceTravelled > distance) {
                winningSpeeds.push(speed);
            }
        }
        return winningSpeeds.length;
    };

    const partOneSum = races.reduce((acc, race) => {
        const count = determineWinningSpeedsCount(race);
        if (acc === 0) return count;
        return acc * count;
    }, 0);

    console.log('Part 1:', partOneSum);

    const race: Race = {
        time: Number.parseInt(rawTimes.replaceAll(/\D+/g, '')),
        distance: Number.parseInt(rawDistances.replaceAll(/\D+/g, '')),
    };

    console.log('Part 2:', determineWinningSpeedsCount(race));
};
