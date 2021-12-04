import {fetchPuzzleInput} from "./src/shared/fetchPuzzleInput";
import {parseNumberArray} from "./src/shared/parseNumberArray";
import {isDepthHigher, slidingWindow} from "./src/scripts/dec-01";

async function run(day: number) {
  let input = await fetchPuzzleInput(day);
  let parsedInput = parseNumberArray(input);
  let result = slidingWindow(parsedInput);
  console.log(result);
}

run(1)
  .then( () => {
    console.log('Completed');
  })
  .catch(() => {
    console.log('Error')
  });