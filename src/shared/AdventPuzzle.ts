import {AdventProblem} from "./AdventProblem";

export abstract class AdventPuzzle implements AdventProblem {
    day: number;

    abstract input: any;

    abstract parseInput(input: any): void;

    abstract solveFirstPuzzle(): void;

    abstract solveSecondPuzzle(): void;

    constructor(day: number) {
        this.day = day;
    }
}