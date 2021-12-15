import {calculateRiskLevel, getThreeLargestBasins} from "../scripts/dec-09";

const input = '2199943210\n' +
    '3987894921\n' +
    '9856789892\n' +
    '8767896789\n' +
    '9899965678';

test('Day 9, Puzzle 1', () => {
    expect(calculateRiskLevel(input)).toBe(15);
})

test('Day 9, Puzzle 2', () => {
    expect(getThreeLargestBasins(input)).toBe(1134)
})