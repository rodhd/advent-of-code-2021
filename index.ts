import {fetchPuzzleInput} from "./src/shared/fetchPuzzleInput";
import {AdventProblems} from "./src/shared/AdventProblems";

async function run() {
  const prompts = require('prompts');
  const response = await prompts( {
    type: 'number',
    name: 'value',
    message: 'Which puzzle day to solve?'
  });
  const day = response.value;
  let input = await fetchPuzzleInput(day);
  let problem = AdventProblems[day];
  problem.parseInput(input);
  problem.solveFirstPuzzle();
  problem.solveSecondPuzzle();
}

run()
  .then( () => {
    console.log('Completed');
  })
  .catch(() => {
    console.log('Error')
  });