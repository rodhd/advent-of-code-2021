export interface AdventProblem {
  day: number;
  input: any;
  parseInput(input: any): void;
  solveFirstPuzzle(): void;
  solveSecondPuzzle(): void;
}