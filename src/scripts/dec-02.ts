enum Direction {
  forward = 'forward',
  up =  'up',
  down = 'down',
}
interface Instruction {
  direction: Direction;
  steps: number;
}
function parseInstruction(text: string): Instruction {
  const [dir, steps] = text.split(' ');
  return {
    direction: Direction[dir],
    steps: parseInt(steps)
  }
}
function calculateNextStep(current: [number, number], instruction: Instruction): [number, number] {
  if(instruction.direction === Direction.forward) {
    return [current[0]+ instruction.steps, current[1]];
  }
  if(instruction.direction === Direction.up) {
    return [current[0], current[1] - instruction.steps];
  }
  if(instruction.direction === Direction.down) {
    return [current[0], current[1] + instruction.steps];
  }
}

function calculateNextStepWithAim(current: [number, number, number], instruction: Instruction): [number, number, number] {
  if(instruction.direction === Direction.forward) {
    return [current[0]+ instruction.steps, current[1] + instruction.steps*current[2], current[2]];
  }
  if(instruction.direction === Direction.up) {
    return [current[0], current[1], current[2] - instruction.steps];
  }
  if(instruction.direction === Direction.down) {
    return [current[0], current[1], current[2] + instruction.steps];
  }
}

export function calculatePosition(input: string[]): number {
  let current: [number, number] = [0, 0];
  const instructions = input.map(x => parseInstruction(x));
  instructions.forEach(
    instruction => {
      current = calculateNextStep(current, instruction);
    }
  )
  return current[0] * current[1];
}

export function calculatePositionWithAim(input: string[]): number {
  let current: [number, number, number] = [0, 0, 0];
  const instructions = input.map(x => parseInstruction(x));
  instructions.forEach(
    instruction => {
      current = calculateNextStepWithAim(current, instruction);
    }
  )
  return current[0] * current[1];
}