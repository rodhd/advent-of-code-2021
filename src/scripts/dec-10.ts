import {AdventPuzzle} from "../shared/AdventPuzzle";

const ilegalValues = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}

const missingValues = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
}

const closingSymbol = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
}

function findFirstIlegalCharacterPoints(line: string): number {
    const symbols = [...line];
    let currentSymbol = [];
    for (let i = 0; i < symbols.length; i++) {
        if (Object.keys(closingSymbol).includes(symbols[i])) {
            currentSymbol.unshift(symbols[i]);
        } else if (symbols[i] !== closingSymbol[currentSymbol[0]]) {
            return ilegalValues[symbols[i]]
        } else {
            currentSymbol.shift();
        }
    }
    return 0;
}

function findMissingCharactersScore(line: string): number | null {
    const symbols = [...line];
    let currentSymbol = [];
    for (let i = 0; i < symbols.length; i++) {
        if (Object.keys(closingSymbol).includes(symbols[i])) {
            currentSymbol.unshift(symbols[i]);
        } else if (symbols[i] !== closingSymbol[currentSymbol[0]]) {
            return null;
        } else {
            currentSymbol.shift();
        }
    }
    let result = 0;
    for (const [s] of currentSymbol) {
        result = result * 5 + missingValues[closingSymbol[s]]
    }
    return result;
}

export function calculateTotalErrorScore(input: string[]): number {
    return input
        .map(l => findFirstIlegalCharacterPoints(l))
        .reduce((a, b) => a + b, 0);
}

export function calculateMissingValuesScore(input: string[]): number {
    const scores = input
        .map(l => findMissingCharactersScore(l))
        .filter(x => x !== null)
        .sort((a, b) => a - b);

    return scores[Math.floor(scores.length / 2)];
}

export class Dec10Puzzle extends AdventPuzzle {
    input: string[];

    parseInput(input: string): void {
        this.input = input.split('\n').filter(x => x !== '');
    }

    solveFirstPuzzle(): void {
        console.log(calculateTotalErrorScore(this.input));
    }

    solveSecondPuzzle(): void {
        console.log(calculateMissingValuesScore(this.input));
    }

}