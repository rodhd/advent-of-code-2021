import {Dec03Puzzle} from "../scripts/dec-03";
import {AdventProblem} from "./AdventProblem";

type ProblemIndex = {
  [key: number]: AdventProblem
}

export const AdventProblems: ProblemIndex = {
  3: new Dec03Puzzle(3),
}