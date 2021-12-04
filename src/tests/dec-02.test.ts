import {calculatePosition, calculatePositionWithAim} from "../scripts/dec-02";

const input = [
  'forward 5',
  'down 5',
  'forward 8',
  'up 3',
  'down 8',
  'forward 2',
]

test('Dec 02, Puzzle 1 is correct?', () =>
{
  expect(calculatePosition(input)).toBe(150);
});

test('Dec 02, Puzzle 2 is correct?', () =>
{
  expect(calculatePositionWithAim(input)).toBe(900);
});