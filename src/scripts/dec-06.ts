import {AdventProblem} from "../shared/AdventProblem";

export function oneDayAfter(daysLeft: number): number[] {
  if(daysLeft > 0) {
    return [daysLeft - 1];
  }
  else if (daysLeft === 0) {
    return [6, 8];
  }
}

export function runSimulation(input: number[]): number {
  let copy = input
  for (let i = 0; i < 80; i++) {
    copy = copy.map(oneDayAfter).flat(1);
  }
  return copy.length;
}

export function initLanternfishDict(lanternfish: number[]) {
  const lanternfishDict = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
  };
  lanternfish.forEach((l) => {
    lanternfishDict[l] = lanternfishDict[l] + 1;
  })
  return lanternfishDict;
}

export function oneDayAfterDict(lanterfishDict) {
  return {
    0: lanterfishDict[1],
    1: lanterfishDict[2],
    2: lanterfishDict[3],
    3: lanterfishDict[4],
    4: lanterfishDict[5],
    5: lanterfishDict[6],
    6: lanterfishDict[7] + lanterfishDict[0],
    7: lanterfishDict[8],
    8: lanterfishDict[0]
  }
}

export function runSimulationLong(input: number[]): number {
  let copy = initLanternfishDict(input);
  for (let i = 0; i < 256; i++) {
    copy = oneDayAfterDict(copy)
  }
  return Object.values(copy).reduce((a,b) => a + b, 0);
}

export class Dec06Puzzle implements AdventProblem {
  day: number;
  input: number[];

  parseInput(input: any): void {
    this.input = input.split(',')
      .filter(x => x !== '')
      .map(x => parseInt(x));
  }

  solveFirstPuzzle(): void {
    const response = runSimulation(this.input);
    console.log(response);
  }

  solveSecondPuzzle(): void {
    const response = runSimulationLong(this.input);
    console.log(response);
  }
  
  constructor(day: number) {
    this.day = day;
  }
}