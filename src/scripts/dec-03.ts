import {AdventProblem} from "../shared/AdventProblem";
import {parseStringArray} from "../shared/parseStringArray";

interface GammaAndEpsilon {
  gamma: string;
  epsilon: string;
}

function onesAreMoreCommon(numbers: string[], index: number): boolean {
  return numbers.map(x => x[index]).filter(x => x === '1').length >= numbers.map(x => x[index]).filter(x => x === '0').length;
}

function zeroesAreLessCommon(numbers: string[], index: number): boolean {
  return numbers.map(x => x[index]).filter(x => x === '0').length <= numbers.map(x => x[index]).filter(x => x === '1').length;
}

function calculateGammaAndEpsilon(numbers: string[], index: number): GammaAndEpsilon {
  let onesAreMoreCommon = numbers.map(x => x[index]).filter(x => x === '1').length > numbers.map(x => x[index]).filter(x => x === '0').length;
  if (onesAreMoreCommon) {
    return {
      gamma: '1',
      epsilon: '0'
    };
  } else {
    return {
      gamma: '0',
      epsilon: '1'
    };
  }
}

export function calculatePowerComsumption(input: string[]): number {
  let gamma = '';
  let epsilon = '';
  
  for (let i = 0; i < input[0].length; i++) {
    let result = calculateGammaAndEpsilon(input, i);
    gamma = gamma + result.gamma;
    epsilon = epsilon + result.epsilon;
  }
  
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function findOxygenGeneratorRating(input: string[]): string {
  let copy = input;
  for (let i = 0; i < input[0].length; i++) {
    const mostCommon = onesAreMoreCommon(copy, i) ? '1' : '0';
    copy = copy.filter(x => x[i] === mostCommon);
    if (copy.length === 1) {
      return copy[0];
    }
  }
}

function findCo2ScrubberRating(input: string[]): string {
  let copy = input;
  for (let i = 0; i < input[0].length; i++) {
    const leastCommon = zeroesAreLessCommon(copy, i) ? '0' : '1';
    copy = copy.filter(x => x[i] === leastCommon);
    if (copy.length === 1) {
      return copy[0];
    }
  }
}

export function calculateLifeSupportRating(input: string[]): number {
  let oxygenGeneratorRating = findOxygenGeneratorRating(input);
  let co2ScrubberRating = findCo2ScrubberRating(input);
  return parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2);
}

export class Dec03Puzzle implements AdventProblem{
  day: number;
  input: any;

  parseInput(input: string): void {
    this.input = parseStringArray(input);
  }

  solveFirstPuzzle(): void {
    let result = calculatePowerComsumption(this.input);
    console.log(result);
  }

  solveSecondPuzzle(): void {
    let result = calculateLifeSupportRating(this.input);
    console.log(result);
  }
  
  constructor(day: number) {
    this.day = day;
  }

  
}