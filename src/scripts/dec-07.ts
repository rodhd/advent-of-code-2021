import {AdventProblem} from "../shared/AdventProblem";

export function calculateMedian(input: number[]): number {
  const sorted = input.sort((a, b) => a - b);
  const mid = sorted.length/2;
  if (mid % 2 === 0) {
    return (sorted[mid-1] + sorted[mid])/2
  } else {
    return sorted[Math.floor(mid)];
  }
}

export function calculateDistanceToMedian(input: number[]): number {
  const median = calculateMedian(input);
  return input.map(x => Math.abs(x - median)).reduce((a,b) => a + b, 0);
}

export function weightedDistance(avg: number, value: number): number {
  const n = Math.abs(value - avg);
  return n*(n + 1) / 2;
}

export function calculateWeightedDistanceToAverage(input: number[]): number {
  const average = Math.floor(input.reduce((a,b) => a + b, 0)/input.length);
  return input.map(x => weightedDistance(average, x)).reduce((a, b) => a + b, 0);
}
export class Dec07Puzzle implements AdventProblem {
  day: number;
  input: number[];

  parseInput(input: any): void {
    this.input = input.split(',')
      .filter(x => x !== '')
      .map(x => parseInt(x));
  }

  solveFirstPuzzle(): void {
    const result = calculateDistanceToMedian(this.input);
    console.log(result);
  }

  solveSecondPuzzle(): void {
    const result = calculateWeightedDistanceToAverage(this.input);
    console.log(result);
  }
  
  constructor(day: number) {
    this.day = day;
  }
  
}