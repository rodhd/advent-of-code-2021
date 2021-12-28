import {Dec03Puzzle} from "../scripts/dec-03";
import {AdventProblem} from "./AdventProblem";
import {Dec04Puzzle} from "../scripts/dec-04";
import {Dec05Puzzle} from "../scripts/dec-05";
import {Dec06Puzzle} from "../scripts/dec-06";
import {Dec07Puzzle} from "../scripts/dec-07";
import {Dec08Puzzle} from "../scripts/dec-08";
import {Dec09Puzzle} from "../scripts/dec-09";
import {Dec10Puzzle} from "../scripts/dec-10";
import {Dec11Puzzle} from "../scripts/dec-11";
import {Dec12Puzzle} from "../scripts/dec-12";
import {Dec13Puzzle} from "../scripts/dec-13";

type ProblemIndex = {
  [key: number]: AdventProblem
}

export const AdventProblems: ProblemIndex = {
  3: new Dec03Puzzle(3),
  4: new Dec04Puzzle(4),
  5: new Dec05Puzzle(5),
  6: new Dec06Puzzle(6),
  7: new Dec07Puzzle(7),
  8: new Dec08Puzzle(8),
  9: new Dec09Puzzle(9),
  10: new Dec10Puzzle(10),
  11: new Dec11Puzzle(11),
  12: new Dec12Puzzle(12),
  13: new Dec13Puzzle(13),
}