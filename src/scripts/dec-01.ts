interface DepthResult {
  depth: number;
  increased: boolean | null;
}

export function isDepthHigher(input: number[]): number {
  let result: DepthResult[] = [{
    depth: input[0],
    increased: null
  }];
  for (let i = 1; i < input.length; i++) {
    result.push({
      depth: input[i],
      increased: input[i] > input [i-1]
    });
  }
  return result.filter(x => x.increased).length;
}

export function slidingWindow(input: number[]): number {
  let sliding: number[] = [];
  for (let i = 2; i < input.length; i++) {
    sliding.push(input[i] + input[i -1] + input[i-2]);
  }
  return isDepthHigher(sliding);
}