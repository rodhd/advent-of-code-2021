import {AdventPuzzle} from "../shared/AdventPuzzle";

export function getNeighbors(i: number, j: number): number[][] {
    const neighbors = [
        [i - 1 < 0 ? null : i - 1, j],
        [i - 1 < 0 ? null : i - 1, j + 1 > 9 ? null : j + 1],
        [i, j + 1 > 9 ? null : j + 1],
        [i + 1 > 9 ? null : i + 1, j + 1 > 9 ? null : j + 1],
        [i + 1 > 9 ? null : i + 1, j],
        [i + 1 > 9 ? null : i + 1, j - 1 < 0 ? null : j - 1],
        [i, j - 1 < 0 ? null : j - 1],
        [i - 1 < 0 ? null : i - 1, j - 1 < 0 ? null : j - 1]
    ]
    return neighbors.filter(n => n[0] !== null && n[1] !== null);
}

function flash(input: number[][], check: boolean[][], i: number, j: number) {
    const neighbors = getNeighbors(i, j);
    neighbors.forEach((neighbor) => {
        input[neighbor[0]][neighbor[1]] = input[neighbor[0]][neighbor[1]] + 1;
    });
    check[i][j] = true;
}

export interface StepResult {
    flashes: number,
    result: number[][]
}

export function takeOneStep(input: number[][]): StepResult {
    let copy = input.map(row => row.map(val => val + 1));
    let check = input.map(row => row.map(() => false));
    let flashes = 0;
    for (let i = 0; i < copy.length; i++) {
        for (let j = 0; j < copy[i].length; j++) {
            if (copy[i][j] > 9 && !check[i][j]) {
                flash(copy, check, i, j);
                [flashes, i, j] = [flashes + 1, 0, 0];
            }
        }
    }
    return {
        flashes: copy.map(row => row.filter(val => val > 9).length).reduce((a, b) => a + b, 0),
        result: copy.map(row => row.map(val => val > 9 ? 0 : val))
    };
}

export function takeHundredSteps(input: number[][]): number {
    let copy = input.map(row => row.map(val => val));
    let flashes = 0;
    for (let i = 0; i < 100; i++) {
        const result = takeOneStep(copy);
        flashes = flashes + result.flashes;
        copy = result.result;
    }
    return flashes;
}

function areAllOctopusesFlashing(input: number[][]): boolean {
    return input.every(row => row.every(val => val === 0));
}

export function stepWhenAllFlash(input: number[][]): number {
    let copy = input.map(row => row.map(val => val));
    let i = 0;
    while (!areAllOctopusesFlashing(copy)) {
        const result = takeOneStep(copy);
        copy = result.result;
        i = i + 1;
        if (i % 10 === 0) {
            console.log(`Step ${i}`)
        }
    }
    return i;
}

export class Dec11Puzzle extends AdventPuzzle {
    input: number[][];

    parseInput(input: any): void {
        this.input = input
            .split('\n')
            .filter(x => x !== '')
            .map(line =>
                [...line]
                    .map(char => parseInt(char))
            );
    }

    solveFirstPuzzle(): void {
        console.log(takeHundredSteps(this.input));
    }

    solveSecondPuzzle(): void {
        console.log(stepWhenAllFlash(this.input));
    }
}