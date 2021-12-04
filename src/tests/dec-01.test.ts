import {isDepthHigher, slidingWindow} from "../scripts/dec-01";

const input = [
  199,
  200,
  208,
  210,
  200,
  207,
  240,
  269,
  260,
  263
]

test('Dec 01, Puzzle 1 is correct?', () =>
{
  expect(isDepthHigher(input)).toBe(7);
});

test('Dec 01, Puzzle 2 is correct?', () =>
{
  expect(slidingWindow(input)).toBe(5);
});