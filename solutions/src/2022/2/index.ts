import { readFile } from 'node:fs/promises';

const main = async () => {
    const input = await readFile('./src/2022/2/input.txt', 'utf8');

    enum Move {
        Rock = 1,
        Paper = 2,
        Scissors = 3,
    }

    enum Result {
        Win = 6,
        Draw = 3,
        Lose = 0,
    }

    const roundEvaluationMap: Record<Move, Record<Move, Result>> = {
        [Move.Rock]: {
            [Move.Rock]: Result.Draw,
            [Move.Paper]: Result.Lose,
            [Move.Scissors]: Result.Win,
        },
        [Move.Paper]: {
            [Move.Rock]: Result.Win,
            [Move.Paper]: Result.Draw,
            [Move.Scissors]: Result.Lose,
        },
        [Move.Scissors]: {
            [Move.Rock]: Result.Lose,
            [Move.Paper]: Result.Win,
            [Move.Scissors]: Result.Draw,
        },
    };

    type AdversaryRawMove = 'A' | 'B' | 'C';
    type OwnRawMove = 'X' | 'Y' | 'Z';

    const moveDecryptMap: Record<AdversaryRawMove | OwnRawMove, Move> = {
        A: Move.Rock,
        B: Move.Paper,
        C: Move.Scissors,
        X: Move.Rock,
        Y: Move.Paper,
        Z: Move.Scissors,
    };

    const desiredResultDecryptMap: Record<OwnRawMove, Result> = {
        X: Result.Lose,
        Y: Result.Draw,
        Z: Result.Win,
    };

    const determineOwnMove = (adversaryMove: Move, desiredResult: Result): Move => {
        for (const move of Object.values(Move)) {
            if (typeof move === 'string') continue;
            if (roundEvaluationMap[move][adversaryMove] === desiredResult) return move;
        }
        throw new Error('No move found');
    };

    let partOneScore = 0;
    let partTwoScore = 0;
    const rounds = input.split('\n');
    for (const round of rounds) {
        const [adversaryRawMove, ownRawMove] = round.split(' ') as [AdversaryRawMove, OwnRawMove];
        const adversaryMove = moveDecryptMap[adversaryRawMove];

        // part one
        const partOneOwnMove = moveDecryptMap[ownRawMove];
        const partOneRoundResult = roundEvaluationMap[partOneOwnMove][adversaryMove];
        partOneScore += partOneOwnMove + partOneRoundResult;

        // part two
        const desiredResult = desiredResultDecryptMap[ownRawMove];
        const partTwoOwnMove = determineOwnMove(adversaryMove, desiredResult);
        partTwoScore += partTwoOwnMove + desiredResult;
    }

    console.log('Part one score:', partOneScore);
    console.log('Part two score:', partTwoScore);
};

void main();
