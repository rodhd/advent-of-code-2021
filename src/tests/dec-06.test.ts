import {runSimulation, runSimulationLong} from "../scripts/dec-06";

const input = [3,4,3,1,2]

test('Day 6, Puzzle 1', () => {
  expect(runSimulation(input)).toBe(5934);
})

test('Day 6, Puzzle 2', () => {
  expect(runSimulationLong(input)).toBe(26984457539);
})