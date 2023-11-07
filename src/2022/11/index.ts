/* eslint-disable @typescript-eslint/no-non-null-assertion */
// https://adventofcode.com/2022/day/11
// https://adventofcode.com/2022/day/11/input
export const solution = (file: string): void => {
    type Operation = {
        operand: '+' | '*';
        left: number | 'old';
        right: number | 'old';
    };

    type Monkey = {
        items: string[];
        operation: Operation;
        test: {
            divisor: number;
            onTrue: number;
            onFalse: number;
        };
    };

    const monkeys: Monkey[] = file.split('\n\n').map((rawMonkey) => {
        const lines = rawMonkey.split('\n');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const items = lines[1]!.split(', ').map((item) => /\d+/g.exec(item)![0]);
        const rawOperation = lines[2]!.split('= ')[1]!.split(' ');

        const operation: Operation = {
            operand: rawOperation[1] as '+' | '*',
            left: rawOperation[0] === 'old' ? 'old' : Number.parseInt(rawOperation[0]!),
            right: rawOperation[2] === 'old' ? 'old' : Number.parseInt(rawOperation[2]!),
        };

        const divisor = Number.parseInt(lines[3]!.split('by ')[1]!, 10);
        if (Number.isNaN(divisor)) throw new Error('Invalid divisor');

        const onTrue = Number.parseInt(lines[4]!.split('to monkey ')[1]!, 10);
        const onFalse = Number.parseInt(lines[5]!.split('to monkey ')[1]!, 10);

        return {
            items,
            operation,
            test: {
                divisor,
                onTrue,
                onFalse,
            },
        };
    });
};
