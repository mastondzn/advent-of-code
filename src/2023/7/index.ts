// https://adventofcode.com/2023/day/7
// https://adventofcode.com/2023/day/7/input
export const solution = (file: string): void => {
    const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'] as const;
    type Card = typeof cards[number];
    type Hand = {
        cards: Card[];
        bid: number;
    };

    const hands: Hand[] = file.split('\n').map((line) => {
        const [cards, bid] = line.split(' ');
        if (!bid || !cards) {
            throw new Error(`Invalid line: ${line}`);
        }

        return {
            cards: [...cards] as Card[],
            bid: Number.parseInt(bid),
        };
    });

    const amountOfCardKinds = (hand: Hand) => {
        const cardRecord: Partial<Record<Card, number>> = {};
        for (const card of hand.cards) {
            cardRecord[card] = cardRecord[card] ? cardRecord[card]! + 1 : 1;
        }
        return Object.entries(cardRecord).sort((a, b) => b[1] - a[1]);
    };

    const amountOfPairs = (hand: Hand): number => {
        const cardRecord = amountOfCardKinds(hand);
        return cardRecord.filter(([, amount]) => amount === 2).length;
    };

    const directives = [
        ['fiveOfAKind', (hand) => amountOfCardKinds(hand)[0]?.[1] === 5],
        ['fourOfAKind', (hand) => amountOfCardKinds(hand)[0]?.[1] === 4],
        [
            'fullHouse',
            (hand) => {
                return (
                    amountOfCardKinds(hand)[0]?.[1] === 3 && amountOfCardKinds(hand)[1]?.[1] === 2
                );
            },
        ],
        ['threeOfAKind', (hand) => amountOfCardKinds(hand)[0]?.[1] === 3],
        ['twoPair', (hand) => amountOfPairs(hand) === 2],
        ['onePair', (hand) => amountOfPairs(hand) === 1],
        ['highCard', (hand) => new Set(hand.cards).size === hand.cards.length],
    ] as const satisfies readonly (readonly [string, (hand: Hand) => boolean])[];

    const getDirectiveStrength = (directive: string) => {
        const index = directives.findIndex(([d]) => d === directive);
        if (index === -1) throw new Error(`No directive found for ${directive}`);
        return index;
    };

    const getCardStrength = (card: Card) => {
        const index = cards.indexOf(card);
        if (index === -1) throw new Error(`No card found for ${card}`);
        return index;
    };

    const handsWithDirectives: (Hand & { directive: string })[] = hands.map((hand) => {
        for (const [directive, fn] of directives) {
            if (fn(hand)) return { ...hand, directive };
        }
        throw new Error(`No directive found for hand: ${JSON.stringify(hand, null, 4)}`);
    });

    const sortedHands = handsWithDirectives.sort((a, b) => {
        // lower directive strength is better
        const directiveStrength =
            getDirectiveStrength(b.directive) - getDirectiveStrength(a.directive);

        if (directiveStrength !== 0) return directiveStrength;

        let index = 0;
        let cardStrength: number;
        do {
            const left = a.cards[index];
            const right = b.cards[index];
            if (!left || !right) {
                throw new Error(`No card found ${index}, ${left}, ${right}`);
            }
            cardStrength = getCardStrength(right) - getCardStrength(left);
            index++;
        } while (cardStrength === 0);

        return cardStrength;
    });

    const partOneSum = sortedHands.reduce((acc, hand, i) => {
        const rank = i + 1;
        const score = hand.bid * rank;
        return acc + score;
    }, 0);

    console.log('Part 1:', partOneSum);
};
