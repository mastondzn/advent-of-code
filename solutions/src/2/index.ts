import { readFile } from 'node:fs/promises';

const main = async () => {
    const input = await readFile('./src/2/input.txt', 'utf8');

    // scuffed lol

    const partOne = {
        wonRounds: 0,
        tiedRounds: 0,
        playedWithRock: 0,
        playedWithPaper: 0,
        playedWithScissors: 0,
    };

    type PlayerOneRawMove = 'A' | 'B' | 'C';
    type PlayerTwoRawMove = 'X' | 'Y' | 'Z';
    type PlayerMove = 'rock' | 'paper' | 'scissors';

    const getPlayerOneMove = (input: PlayerOneRawMove): PlayerMove => {
        if (input === 'A') return 'rock';
        if (input === 'B') return 'paper';
        if (input === 'C') return 'scissors';
        throw new Error('Unreachable');
    };

    const getPlayerTwoMoveInPartOne = (input: PlayerTwoRawMove): PlayerMove => {
        if (input === 'X') return 'rock';
        if (input === 'Y') return 'paper';
        if (input === 'Z') return 'scissors';
        throw new Error('Unreachable');
    };

    const isWinForPlayerTwo = (playerOneMove: PlayerMove, playerTwoMove: PlayerMove): boolean => {
        if (playerTwoMove === 'rock' && playerOneMove === 'scissors') {
            return true;
        } else if (playerTwoMove === 'paper' && playerOneMove === 'rock') {
            return true;
        } else if (playerTwoMove === 'scissors' && playerOneMove === 'paper') {
            return true;
        }
        return false;
    };

    const isTie = (playerOneMove: PlayerMove, playerTwoMove: PlayerMove): boolean => {
        return playerOneMove === playerTwoMove;
    };

    const rounds = input.split('\n');
    for (const round of rounds) {
        const [playerOne, playerTwo] = round.split(' ') as [PlayerOneRawMove, PlayerTwoRawMove];
        const [playerOneAction, playerTwoAction] = [
            getPlayerOneMove(playerOne),
            getPlayerTwoMoveInPartOne(playerTwo),
        ];

        if (isWinForPlayerTwo(playerOneAction, playerTwoAction)) partOne.wonRounds++;
        if (isTie(playerOneAction, playerTwoAction)) partOne.tiedRounds++;

        if (playerTwoAction === 'rock') partOne.playedWithRock++;
        if (playerTwoAction === 'paper') partOne.playedWithPaper++;
        if (playerTwoAction === 'scissors') partOne.playedWithScissors++;
    }

    const partOneScore =
        partOne.wonRounds * 6 +
        partOne.tiedRounds * 3 +
        partOne.playedWithRock * 1 +
        partOne.playedWithPaper * 2 +
        partOne.playedWithScissors * 3;

    console.log('Part one:');
    console.log({ ...partOne, score: partOneScore });

    const partTwo = {
        wonRounds: 0,
        tiedRounds: 0,
        playedWithRock: 0,
        playedWithPaper: 0,
        playedWithScissors: 0,
    };

    type DesiredOutcome = 'win' | 'lose' | 'tie';

    const getDesiredOutcome = (input: PlayerTwoRawMove): DesiredOutcome => {
        if (input === 'X') return 'lose';
        if (input === 'Y') return 'tie';
        if (input === 'Z') return 'win';
        throw new Error('Unreachable');
    };

    const getPlayerTwoMoveInPartTwo = (
        playerOneMove: PlayerMove,
        desiredOutcome: DesiredOutcome
    ): PlayerMove => {
        switch (desiredOutcome) {
            case 'win': {
                if (playerOneMove === 'rock') return 'paper';
                if (playerOneMove === 'paper') return 'scissors';
                if (playerOneMove === 'scissors') return 'rock';

                break;
            }
            case 'lose': {
                if (playerOneMove === 'rock') return 'scissors';
                if (playerOneMove === 'paper') return 'rock';
                if (playerOneMove === 'scissors') return 'paper';

                break;
            }
            case 'tie': {
                return playerOneMove;
            }
        }
        throw new Error('Unreachable');
    };

    for (const round of rounds) {
        const [playerOne, playerTwo] = round.split(' ') as [PlayerOneRawMove, PlayerTwoRawMove];
        const [playerOneAction, desiredOutcome] = [
            getPlayerOneMove(playerOne),
            getDesiredOutcome(playerTwo),
        ];

        const playerTwoAction = getPlayerTwoMoveInPartTwo(playerOneAction, desiredOutcome);

        if (desiredOutcome === 'win') partTwo.wonRounds++;
        if (desiredOutcome === 'tie') partTwo.tiedRounds++;

        if (playerTwoAction === 'rock') partTwo.playedWithRock++;
        if (playerTwoAction === 'paper') partTwo.playedWithPaper++;
        if (playerTwoAction === 'scissors') partTwo.playedWithScissors++;
    }

    const partTwoScore =
        partTwo.wonRounds * 6 +
        partTwo.tiedRounds * 3 +
        partTwo.playedWithRock * 1 +
        partTwo.playedWithPaper * 2 +
        partTwo.playedWithScissors * 3;

    console.log('Part two:');
    console.log({ ...partTwo, score: partTwoScore });
};

void main();
