import {AdventPuzzle} from "../shared/AdventPuzzle";

export function getPaperAndInstructions(input: string): { paper: number[][], foldInstructions: number[][] } {
    const {0: coords, 1: instructions} = input.split('\n\n');

    const paper = coords.split('\n').filter(x => x !== '').map(x => x.split(',').map(y => parseInt(y)));

    const foldRegexp = /x=(?<x>\d+)|y=(?<y>\d+)/;

    const foldInstructions = instructions
        .split('\n')
        .filter(x => x !== '')
        .map(x => foldRegexp.exec(x))
        .map(r => [parseInt(r.groups.x ?? '0'), parseInt(r.groups.y ?? '0')]);

    return {paper, foldInstructions};
}

export function foldPaper(paper: number[][], foldInstruction: number[]): number[][] {
    if (foldInstruction[0] > 0) {
        return paper
            .map(x => x[0] > foldInstruction[0] ? [foldInstruction[0] * 2 - x[0], x[1]] : x);
    } else {
        return paper
            .map(y => y[1] > foldInstruction[1] ? [y[0], foldInstruction[1] * 2 - y[1]] : y);
    }
}

export function doOneFold(input: string): number {
    let {paper, foldInstructions} = getPaperAndInstructions(input);
    paper = foldPaper(paper, foldInstructions[0]);
    const uniquePoints = new Set(paper.map(x => x.join(',')));
    return uniquePoints.size;
}

export function doAllFolds(input: string): string {
    let {paper, foldInstructions} = getPaperAndInstructions(input);
    foldInstructions.forEach((instruction) => {
        paper = foldPaper(paper, instruction);
    })

    //@ts-ignore
    const maxX = Math.max(...paper.map(x => x[0]));
    //@ts-ignore
    const maxY = Math.max(...paper.map(y => y[1]));

    let result = new Array(maxY + 1).fill(null);
    result = result.map(() => new Array(maxX + 1).fill('.'));

    paper.forEach((point) => {
        result[point[1]][point[0]] = '#';
    })

    return result.map(x => x.join('')).join('\n');

}

export class Dec13Puzzle extends AdventPuzzle {
    input: any;

    parseInput(input: any): void {
        this.input = input;
    }

    solveFirstPuzzle(): void {
        console.log(doOneFold(this.input));
    }

    solveSecondPuzzle(): void {
        console.log(doAllFolds(this.input))
    }

}