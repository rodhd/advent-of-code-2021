import {fetchPuzzleInput} from "./src/shared/fetchPuzzleInput";
import {AdventProblems} from "./src/shared/AdventProblems";

async function run(day: number) {
  let input = await fetchPuzzleInput(day);
  let problem = AdventProblems[day];
  problem.parseInput(input);
  problem.solveFirstPuzzle();
  problem.solveSecondPuzzle();
}

run(3)
  .then( () => {
    console.log('Completed');
  })
  .catch(() => {
    console.log('Error')
  });