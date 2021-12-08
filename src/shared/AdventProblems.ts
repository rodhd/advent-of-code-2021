import {Dec03Puzzle} from "../scripts/dec-03";
import {AdventProblem} from "./AdventProblem";
import {Dec04Puzzle} from "../scripts/dec-04";
import {Dec05Puzzle} from "../scripts/dec-05";

type ProblemIndex = {
  [key: number]: AdventProblem
}

export const AdventProblems: ProblemIndex = {
  3: new Dec03Puzzle(3),
  4: new Dec04Puzzle(4),
  5: new Dec05Puzzle(5)
}