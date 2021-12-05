import {calculateLifeSupportRating, calculatePowerComsumption} from "../scripts/dec-03";

const input = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
]
test('Dec 03, Puzzle 1 is correct?', () => {
  expect(calculatePowerComsumption(input)).toBe(198)
});

test('Dec 03, Puzzle 2 is correct?', () => {
  expect(calculateLifeSupportRating(input)).toBe(230)
});