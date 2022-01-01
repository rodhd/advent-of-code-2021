import {doFortyStepsImproved, doOneStep, doTenSteps, InsertionRule} from "../scripts/dec-14";

const parsedTemplate = ['N', 'N', 'C', 'B'];

const parsedRules: InsertionRule[] = [
    {pair: 'CH', result: 'B'},
    {pair: 'HH', result: 'N'},
    {pair: 'CB', result: 'H'},
    {pair: 'NH', result: 'C'},
    {pair: 'HB', result: 'C'},
    {pair: 'HC', result: 'B'},
    {pair: 'HN', result: 'C'},
    {pair: 'NN', result: 'C'},
    {pair: 'BH', result: 'H'},
    {pair: 'NC', result: 'B'},
    {pair: 'NB', result: 'B'},
    {pair: 'BN', result: 'B'},
    {pair: 'BB', result: 'N'},
    {pair: 'BC', result: 'B'},
    {pair: 'CC', result: 'N'},
    {pair: 'CN', result: 'C'}
];

const oneStepResult = ['N', 'C', 'N', 'B', 'C', 'H', 'B']

test('Do one step', () => {
    expect(doOneStep(parsedTemplate, parsedRules)).toStrictEqual(oneStepResult);
})

const input = 'NNCB\n' +
    '\n' +
    'CH -> B\n' +
    'HH -> N\n' +
    'CB -> H\n' +
    'NH -> C\n' +
    'HB -> C\n' +
    'HC -> B\n' +
    'HN -> C\n' +
    'NN -> C\n' +
    'BH -> H\n' +
    'NC -> B\n' +
    'NB -> B\n' +
    'BN -> B\n' +
    'BB -> N\n' +
    'BC -> B\n' +
    'CC -> N\n' +
    'CN -> C\n'

test('Day 14, Puzzle 1', () => {
    expect(doTenSteps(input)).toBe(1588);
})

test('Day 14, Puzzle 2', () => {
    expect(doFortyStepsImproved(input)).toBe(2188189693529);
})