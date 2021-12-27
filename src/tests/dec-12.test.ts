import {exploreAllPaths, exploreAllPathsAlt} from "../scripts/dec-12";


const shortInput = [
    'start-A',
    'start-b',
    'A-c',
    'A-b',
    'b-d',
    'A-end',
    'b-end'
];


test('Easy test', () => {
    expect(exploreAllPaths(shortInput)).toBe(10);
})

const longInput = [
    'dc-end',
    'HN-start',
    'start-kj',
    'dc-start',
    'dc-HN',
    'LN-dc',
    'HN-end',
    'kj-sa',
    'kj-HN',
    'kj-dc'
];

test('Harder test', () => {
    expect(exploreAllPaths(longInput)).toBe(19);
})

test('Puzzle 2, simple test', () => {
    expect(exploreAllPathsAlt(shortInput)).toBe(36);
})

test('Puzzle 2, harder test', () => {
    expect(exploreAllPathsAlt(longInput)).toBe(103);
})