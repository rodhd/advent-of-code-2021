import {AdventProblem} from "../shared/AdventProblem";
import {fetchPuzzleInput} from "../shared/fetchPuzzleInput";
import * as _ from "lodash";

export function parseNumbersList(input: string): string[] {
  return input.split('\n')[0].split(',');
}

export const bingoCardRegexp =/(?<Card>(^\s?\d{1,2}(\s{1,2}\d{1,2}){4}\n?){5})/gm

export function parseBingoCards(input: string): string[][][] {
  const cards = [...input.matchAll(bingoCardRegexp)];
  let result = [];
  for (let i = 0; i < cards.length; i++){
    let temp = [];
    let card = cards[i].groups['Card'].split('\n');
    for (let j = 0; j < card.length; j++) {
      if(card[j].length > 1) {
        temp.push(card[j]
          .split(/\s+/)
          .map(x => x.trim())
          .filter(x => x !== ''));
      }
    }
    result.push(temp);
  }
  return result;
}

export function drawNumber(draw: string, cards: string[][][]): string[][][] {
  return cards.map(
    x => x.map(
      y => y.map(
        z => z === draw ? '*' : z
      )
    )
  )
}

function isRowComplete(card: string[][]): boolean {
  for (let i = 0; i < card.length; i++) {
     if(card[i].every(x => x === '*')) {
       return true;
     }
  }
  return false;
}

function isColumnComplete(card: string[][]): boolean {
  for (let j = 0; j < card[0].length; j++) {
    if(card.map(x => x[j]).every(y => y === '*')) {
      return true;
    }
  }
  return false;
}

export function calculateScore(card: string[][]): number {
  let result = 0;
  for (let i = 0; i < card.length; i++) {
    for (let j = 0; j < card[i].length; j++) {
      result = card[i][j] !== '*' ? result + parseInt(card[i][j]) : result;
    }
  }
  return result;
}

export function isWinner(card: string[][]): boolean {
  return isRowComplete(card) || isColumnComplete(card);
}

export function findWinnerAndCalculateScore(input: string): number {
  let copy = parseBingoCards(input);
  let drawNumbersList = parseNumbersList(input);
  
  for (let n = 0; n < drawNumbersList.length; n++) {
    let draw = drawNumbersList[n];
    copy = drawNumber(draw, copy);
    for (let c = 0; c < copy.length; c++) {
      if(isWinner(copy[c])) {
        return calculateScore(copy[c]) * parseInt(draw);
      }
    }
  }
}

export function findLastWinnerAndCalculateScore(input: string): number {
  let copy = parseBingoCards(input);
  let drawNumbersList = parseNumbersList(input);
  let winnersList = [];
  let winnerScore = null;
  let winningDraw = null;

  for (let n = 0; n < drawNumbersList.length; n++) {
    let draw = drawNumbersList[n];
    copy = drawNumber(draw, copy);
    for (let c = 0; c < copy.length; c++) {
      if(!winnersList.includes(c) && isWinner(copy[c])) {
        winnerScore = calculateScore(copy[c]);
        winningDraw = draw;
        winnersList.push(c);
      }
    }
  }
  return winnerScore * parseInt(winningDraw);
}

export class Dec04Puzzle implements AdventProblem {
  day: number;
  input: string;

  parseInput(input: string): void {
    this.input = input;
  }

  solveFirstPuzzle(): void {
    const result = findWinnerAndCalculateScore(this.input);
    console.log(result);
  }

  solveSecondPuzzle(): void {
    const result = findLastWinnerAndCalculateScore(this.input);
    console.log(result);
  }
  
  constructor(day: number) {
    this.day = day;
  }
  
}