import {Dec03Puzzle} from "../scripts/dec-03";
import {AdventProblem} from "./AdventProblem";
import {Dec04Puzzle} from "../scripts/dec-04";
import {Dec05Puzzle} from "../scripts/dec-05";
import {Dec06Puzzle} from "../scripts/dec-06";

type ProblemIndex = {
  [key: number]: AdventProblem
}

export const AdventProblems: ProblemIndex = {
  3: new Dec03Puzzle(3),
  4: new Dec04Puzzle(4),
  5: new Dec05Puzzle(5),
  6: new Dec06Puzzle(6)
}