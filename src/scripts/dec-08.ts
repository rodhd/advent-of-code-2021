import {AdventProblem} from "../shared/AdventProblem";

const uniqueLengths = [2, 4, 3, 7];

type NumberMappings = {
    0: string | null;
    1: string | null;
    2: string | null;
    3: string | null;
    4: string | null;
    5: string | null;
    6: string | null;
    7: string | null;
    8: string | null;
    9: string | null;
}

export function countEasyNumbersInLine(line: string): number {
    return line
        .split('|')[1]
        .split(' ')
        .filter(x => x !== '')
        .map(x => x.trim())
        .filter(x => uniqueLengths.includes(x.length))
        .length;
}

export function countEasyNumbersTotal(input: string): number {
    return input
        .split('\n')
        .filter(x => x !== '')
        .map(x => countEasyNumbersInLine(x))
        .reduce((a, b) => a + b, 0);
}

function initNumberMapping(digits: string[]): NumberMappings {
    return {
        0: null,
        1: digits.filter(x => x.length === 2)[0],
        2: null,
        3: null,
        4: digits.filter(x => x.length === 4)[0],
        5: null,
        6: null,
        7: digits.filter(x => x.length === 3)[0],
        8: digits.filter(x => x.length === 7)[0],
        9: null
    }
}

type SegmentCount = {
    [key: string]: number;
}

function calculateSegmentCount(digits: string[]): SegmentCount {
    let segments: SegmentCount = {};
    digits.forEach((digit) => {
        [...digit].forEach((c) => {
            if (Object.keys(segments).includes(c)) {
                segments[c] = segments[c] + 1;
            } else {
                segments[c] = 1;
            }
        })
    });
    return segments
}

function decodeLine(line: string): number {
    //Get numbers 1, 4, 7 and 8
    const digits = line.split(' | ')[0].split(' ').filter(x => x !== '' && x !== '|').map(x => x.trim());
    let mapping = initNumberMapping(digits);
    //Get number 3
    let segments: SegmentCount = calculateSegmentCount(digits.filter(x => uniqueLengths.includes(x.length)));
    const rightSegments = Object.keys(segments).filter(x => segments[x] === 4);
    mapping[3] = digits.filter(x => x.includes(rightSegments[0]) && x.includes(rightSegments[1]) && x.length === 5)[0];
    //Get numbers 0 and 9
    const zeroAndNine = digits.filter(x => x.length === 6 && x.includes(rightSegments[0]) && x.includes(rightSegments[1]));
    if ([...mapping[3]].map(x => zeroAndNine[0].includes(x)).filter(y => y).length === 5) {
        mapping[9] = zeroAndNine[0];
        mapping[0] = zeroAndNine[1];
    } else {
        mapping[9] = zeroAndNine[1];
        mapping[0] = zeroAndNine[0];
    }
    //Get number 6
    mapping[6] = digits.filter(x => !Object.values(mapping).includes(x) && x.length === 6)[0];
    //Get 5 and 2
    const twoAndFive = digits.filter(x => !Object.values(mapping).includes(x));
    if ([...mapping[9]].map(x => twoAndFive[0].includes(x)).filter(y => y).length === 5) {
        mapping[5] = twoAndFive[0];
        mapping[2] = twoAndFive[1];
    } else {
        mapping[5] = twoAndFive[1];
        mapping[2] = twoAndFive[0];
    }
    //Decode output
    const output = line.split(" | ")[1].split(' ').filter(x => x !== '').map(x => x.trim());
    const reverseMapping = {};
    for (const [key, value] of Object.entries(mapping)) {
        reverseMapping[value] = key;
    }
    let result = "";
    output.forEach((o) => {
        const seg = [...o]
        for (const [key, value] of Object.entries(mapping)) {
            if ([...value].every(x => seg.includes(x)) && value.length === o.length) {
                result = result.concat(key);
                break;
            }
        }
    })
    return parseInt(result);
}

export function calculateSumOfOutputs(input: string): number {
    return input
        .split('\n')
        .filter(x => x !== '')
        .map(x => decodeLine(x))
        .reduce((a, b) => a + b, 0);
}

export class Dec08Puzzle implements AdventProblem {
    day: number;
    input: string;

    parseInput(input: string): void {
        this.input = input;
    }

    solveFirstPuzzle(): void {
        const result = countEasyNumbersTotal(this.input);
        console.log(result);
    }

    solveSecondPuzzle(): void {
        const result = calculateSumOfOutputs(this.input);
        console.log(result);
    }

    constructor(day: number) {
        this.day = day;
    }
}