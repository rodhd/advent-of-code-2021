import {AdventProblem} from "../shared/AdventProblem";

export interface Line {
  start: [number, number];
  end: [number, number]
}

function parseLine(rawLine: string): Line {
  const [start, end] = rawLine.split('->').map(x => x.trim());
  return {
    start: [parseInt(start.split(',')[0]), parseInt(start.split(',')[1])],
    end: [parseInt(end.split(',')[0]), parseInt(end.split(',')[1])]
  }
}

function isLineVerticalOrHorizontal(line: Line): boolean {
  return line.start[0] === line.end[0] || line.start[1] === line.end[1];
}

export function getHorizontalAndVerticalLines(input: string[]): Line[] {
  const lines = input.map(parseLine);
  return lines.filter(isLineVerticalOrHorizontal);
}

export function getAllLines(input: string[]): Line[] {
  return input.map(parseLine);
}

export function getCoveredPoints(line: Line): [number, number][] {
  let points = [line.start];
  if (line.start[0] === line.end[0]) {
    if(line.start[1] <= line.end[1]) {
      for (let x = line.start[1] + 1; x < line.end[1]; x++) {
        points.push([line.start[0], x]);
      }
    }
    else {
      for (let x = line.end[1] + 1; x < line.start[1]; x++) {
        points.push([line.start[0], x]);
      }
    }
  }
  else if (line.start[1] === line.end[1]) {
    if(line.start[0] <= line.end[0]) {
      for (let y = line.start[0] + 1; y < line.end[0]; y++) {
        points.push([y, line.start[1]]);
      }
    }
    else {
      for (let y = line.end[0] + 1; y < line.start[0]; y++) {
        points.push([y, line.start[1]]);
      }
    }
  }
  points.push(line.end);
  return points;
}

export function getCoveredPointsIncludingDiagonals(line: Line): [number, number][] {
  let points = [line.start];
  if (line.start[0] === line.end[0]) {
    if(line.start[1] <= line.end[1]) {
      for (let x = line.start[1] + 1; x < line.end[1]; x++) {
        points.push([line.start[0], x]);
      }
    }
    else {
      for (let x = line.end[1] + 1; x < line.start[1]; x++) {
        points.push([line.start[0], x]);
      }
    }
  }
  else if (line.start[1] === line.end[1]) {
    if(line.start[0] <= line.end[0]) {
      for (let y = line.start[0] + 1; y < line.end[0]; y++) {
        points.push([y, line.start[1]]);
      }
    }
    else {
      for (let y = line.end[0] + 1; y < line.start[0]; y++) {
        points.push([y, line.start[1]]);
      }
    }
  }
  else {
    let x_dir = line.start[0] <= line.end[0] ? 1 : -1;
    let y_dir = line.start[1] <= line.end[1] ? 1 : -1;
    let steps = Math.abs(line.end[0] - line.start[0]);
    for (let i = 1; i < steps; i++) {
      points.push([line.start[0] + i*x_dir, line.start[1] + i*y_dir])
    }
  }
  points.push(line.end);
  return points;
}

export function getAllCoveredPoints(lines: Line[]):  [number, number][] {
  return lines.map(x => getCoveredPoints(x)).flat(1);
}

export function getAllCoveredPointsIncludingDiagonals(lines: Line[]):  [number, number][] {
  return lines.map(x => getCoveredPointsIncludingDiagonals(x)).flat(1);
}


type PointMap = {
  [key: string]: number;
}

export function getLinesOverlap(input: string[]): number {
  let lines: Line[] = getHorizontalAndVerticalLines(input);
  let points: [number, number][] = getAllCoveredPoints(lines);
  let pointMap: PointMap = {};
  points.forEach((point) => {
    console.log(point);
    if(Object.keys(pointMap).includes(point.toString())) {
      pointMap[point.toString()]++;
    }
    else {
      pointMap[point.toString()] = 1;
    }
  });
  return Object.values(pointMap).filter(x => x > 1).length;
}

export function getLinesOverlapIncludingDiagonals(input: string[]): number {
  let lines: Line[] = getAllLines(input);
  let points: [number, number][] = getAllCoveredPointsIncludingDiagonals(lines);
  let pointMap: PointMap = {};
  points.forEach((point) => {
    if(Object.keys(pointMap).includes(point.toString())) {
      pointMap[point.toString()]++;
    }
    else {
      pointMap[point.toString()] = 1;
    }
  });
  return Object.values(pointMap).filter(x => x > 1).length;
}

export class Dec05Puzzle implements AdventProblem {
  day: number;
  input: string[];

  parseInput(input: string): void {
    this.input = input.split('\n').filter(x => x !== '');
  }

  solveFirstPuzzle(): void {
    //let result = getLinesOverlap(this.input);
    //console.log(result);
  }

  solveSecondPuzzle(): void {
    let result = getLinesOverlapIncludingDiagonals(this.input);
    console.log(result);
  }
  
  constructor(day: number) {
    this.day = day;
  }
  
}