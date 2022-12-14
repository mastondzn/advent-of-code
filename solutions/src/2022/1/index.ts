export const solution = (file: string): void => {
    const elves = file
        .split('\n\n')
        .map((elf) => {
            const foods = elf.split('\n');
            let total = 0;

            for (const calories of foods) {
                total += Number.parseInt(calories, 10);
            }

            return total;
        })
        .sort();

    const mostCalories = elves.at(-1);
    const topThreeMostCaloriesTotal = elves.slice(-3).reduce((a, b) => a + b, 0);

    console.log('Elf with most calories:', mostCalories);
    console.log('Total of top three elves with most calories:', topThreeMostCaloriesTotal);
};
