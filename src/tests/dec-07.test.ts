import {calculateDistanceToMedian, calculateWeightedDistanceToAverage} from "../scripts/dec-07";

const input = [16,1,2,0,4,2,7,1,2,14]

test('Day 7, Puzzle 1', () => {
  expect(calculateDistanceToMedian(input)).toBe(37);
})

test('Day 7, Puzzle 2', () => {
  expect(calculateWeightedDistanceToAverage(input)).toBe(168);
})