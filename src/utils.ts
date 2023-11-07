export const validateArgs = (...args: unknown[]): boolean => {
    const missingTruthyArgs = args.some((arg) => !arg);
    const hasUndefinedArgs = args.includes(undefined);

    if (missingTruthyArgs || hasUndefinedArgs) {
        console.log('Please provide a day and year (for example pnpm start 2022 7)');
        return false;
    }
    const regex = /^\d+$/;
    const hasInvalidArgs = args.some((arg) => {
        if (!(typeof arg === 'string')) throw new Error('Invalid arg type');
        return !regex.test(arg);
    });
    if (hasInvalidArgs) {
        console.log('Please provide a valid year and day (for example pnpm start 2022 7)');
        return false;
    }
    return true;
};
