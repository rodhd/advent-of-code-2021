import {doAllFolds, doOneFold, getPaperAndInstructions} from "../scripts/dec-13";

const input = '6,10\n' +
    '0,14\n' +
    '9,10\n' +
    '0,3\n' +
    '10,4\n' +
    '4,11\n' +
    '6,0\n' +
    '6,12\n' +
    '4,1\n' +
    '0,13\n' +
    '10,12\n' +
    '3,4\n' +
    '3,0\n' +
    '8,4\n' +
    '1,10\n' +
    '2,14\n' +
    '8,10\n' +
    '9,0\n' +
    '\n' +
    'fold along y=7\n' +
    'fold along x=5';

const parsedInput = {
    paper: [
        [6, 10],
        [0, 14],
        [9, 10],
        [0, 3],
        [10, 4],
        [4, 11],
        [6, 0],
        [6, 12],
        [4, 1],
        [0, 13],
        [10, 12],
        [3, 4],
        [3, 0],
        [8, 4],
        [1, 10],
        [2, 14],
        [8, 10],
        [9, 0]
    ],
    foldInstructions: [
        [0, 7],
        [5, 0]
    ]
}

test('Test parsing', () => {
    expect(getPaperAndInstructions(input)).toStrictEqual(parsedInput);
})

test('Day 13, Puzzle 1', () => {
    expect(doOneFold(input)).toBe(17)
})

const code = '#####\n' +
    '#...#\n' +
    '#...#\n' +
    '#...#\n' +
    '#####'

test('Day 13, Puzzle 2', () => {
    expect(doAllFolds(input)).toBe(code);
})