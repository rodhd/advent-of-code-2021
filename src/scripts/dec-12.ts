import {AdventPuzzle} from "../shared/AdventPuzzle";

function isBig(cave: string) {
    return cave === cave.toUpperCase();
}

function isStart(cave: string) {
    return cave === 'start';
}

function isEnd(cave: string) {
    return cave === 'end';
}

interface Path {
    startCave: string,
    endCave: string
}

export function readMap(input: string[]): Path[] {
    let paths: Path[] = [];
    input.forEach((line) => {
        const {0: start, 1: end} = line.split('-');
        paths.push({
            startCave: start,
            endCave: end
        })
    });
    return paths;
}

function exploreNextPath(exploredCaves: string[], currentCave: string, map: Path[], correctPaths: string[][]) {
    if (isEnd(currentCave)) {
        correctPaths.push([...exploredCaves, currentCave]);
        return;
    }

    const nextCaves = map
        .filter(x => x.startCave === currentCave || x.endCave === currentCave)
        .map(y => y.startCave === currentCave ? y.endCave : y.startCave)
        .filter(z => isBig(z) || !exploredCaves.includes(z));

    if (!nextCaves || nextCaves.length === 0) {
        return;
    }

    nextCaves.forEach((cave) => {
        exploreNextPath([...exploredCaves, currentCave], cave, map, correctPaths)
    });
}

function canVisitSmallCaveAgain(exploredCaves: string[], cave: string): boolean {
    const visitedCaves = new Set(exploredCaves.filter(x => !isBig(x)));
    if ([...visitedCaves].map(x => exploredCaves.filter(c => c === x).length).some(y => y === 2)) {
        return !exploredCaves.includes(cave);
    } else {
        return exploredCaves.filter(x => x === cave).length <= 1;
    }
}

function exploreNextPathAlt(exploredCaves: string[], currentCave: string, map: Path[], correctPaths: string[][]) {
    if (isEnd(currentCave)) {
        correctPaths.push([...exploredCaves, currentCave]);
        return;
    }

    const nextCaves = map
        .filter(x => x.startCave === currentCave || x.endCave === currentCave)
        .map(y => y.startCave === currentCave ? y.endCave : y.startCave)
        .filter(z => !isStart(z) && (isBig(z) || canVisitSmallCaveAgain([...exploredCaves, currentCave], z)));

    if (!nextCaves || nextCaves.length === 0) {
        return;
    }

    nextCaves.forEach((cave) => {
        exploreNextPathAlt([...exploredCaves, currentCave], cave, map, correctPaths)
    });
}

export function exploreAllPaths(input: string[]): number {
    let exploredCaves = [];
    let currentCave = 'start';
    const map = readMap(input);
    let correctPaths = [];

    exploreNextPath(exploredCaves, currentCave, map, correctPaths);

    return correctPaths.length;
}

export function exploreAllPathsAlt(input: string[]): number {
    let exploredCaves = [];
    let currentCave = 'start';
    const map = readMap(input);
    let correctPaths = [];

    exploreNextPathAlt(exploredCaves, currentCave, map, correctPaths);

    return correctPaths.length;
}

export class Dec12Puzzle extends AdventPuzzle {
    input: string[];

    parseInput(input: any): void {
        this.input = input.split('\n').filter(x => x !== '');
    }

    solveFirstPuzzle(): void {
        console.log(exploreAllPaths(this.input));
    }

    solveSecondPuzzle(): void {
        console.log(exploreAllPathsAlt(this.input));
    }

}
