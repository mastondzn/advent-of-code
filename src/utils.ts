export const parseArgs = (args: string[] = process.argv): { year: string; day: string } | null => {
    const last = args.slice(-2);

    const [year, day] = last;
    const re = /^\d+$/;

    if (!year || !day || !re.test(year) || !re.test(day)) {
        return null;
    }

    return { year, day };
};
