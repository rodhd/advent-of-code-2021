import {fetchPuzzleInput} from "./src/shared/fetchPuzzleInput";
import {parseStringArray} from "./src/shared/parseStringArray";
import {calculatePosition, calculatePositionWithAim} from "./src/scripts/dec-02";

async function run(day: number) {
  let input = await fetchPuzzleInput(day);
  let parsedInput = parseStringArray(input);
  let result = calculatePositionWithAim(parsedInput);
  console.log(result);
}

run(2)
  .then( () => {
    console.log('Completed');
  })
  .catch(() => {
    console.log('Error')
  });