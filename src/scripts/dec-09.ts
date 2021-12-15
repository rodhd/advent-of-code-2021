import {AdventPuzzle} from "../shared/AdventPuzzle";

function generateHeightMap(input: string): number[][] {
    return input
        .split('\n')
        .filter(x => x !== "")
        .map(l => [...l].map(x => parseInt(x)));
}

function isLowPoint(heightMap: number[][], i: number, j: number): boolean {
    const up = i - 1 < 0 ? true : heightMap[i][j] < heightMap[i - 1][j];
    const down = i + 1 >= heightMap.length ? true : heightMap[i][j] < heightMap[i + 1][j];
    const left = j - 1 < 0 ? true : heightMap[i][j] < heightMap[i][j - 1];
    const right = j + 1 >= heightMap[0].length ? true : heightMap[i][j] < heightMap[i][j + 1];

    return up && down && left && right;
}

export function calculateRiskLevel(input: string): number {
    const heightMap = generateHeightMap(input);
    let result = 0;
    for (let i = 0; i < heightMap.length; i++) {
        for (let j = 0; j < heightMap[i].length; j++) {
            result = result + (isLowPoint(heightMap, i, j) ? heightMap[i][j] + 1 : 0);
        }
    }

    return result;
}

function calculateBasinSize(heightMap: number[][], i: number, j: number, basin: Set<string>) {
    if (heightMap[i][j] === 9) {
        return;
    }
    if (i - 1 >= 0 && heightMap[i - 1][j] > heightMap[i][j]) {
        calculateBasinSize(heightMap, i - 1, j, basin);
    }
    if (i + 1 < heightMap.length && heightMap[i + 1][j] > heightMap[i][j]) {
        calculateBasinSize(heightMap, i + 1, j, basin);
    }
    if (j - 1 >= 0 && heightMap[i][j - 1] > heightMap[i][j]) {
        calculateBasinSize(heightMap, i, j - 1, basin);
    }
    if (j + 1 < heightMap[i].length && heightMap[i][j + 1] > heightMap[i][j]) {
        calculateBasinSize(heightMap, i, j + 1, basin);
    }
    basin.add(`${i},${j}`);
}

export function getThreeLargestBasins(input: string): number {
    let heightMap = generateHeightMap(input);
    let result = [];
    for (let i = 0; i < heightMap.length; i++) {
        for (let j = 0; j < heightMap[i].length; j++) {
            if (isLowPoint(heightMap, i, j)) {
                let basin = new Set<string>();
                calculateBasinSize(heightMap, i, j, basin);
                result.push([...basin].length);
            }
        }
    }
    return result.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a * b, 1);
}

export class Dec09Puzzle extends AdventPuzzle {
    input: any;

    parseInput(input: any): void {
        this.input = input;
    }

    solveFirstPuzzle(): void {
        console.log(calculateRiskLevel(this.input));
    }

    solveSecondPuzzle(): void {
        console.log(getThreeLargestBasins(this.input));
    }

}