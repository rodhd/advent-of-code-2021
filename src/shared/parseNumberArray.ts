export function parseNumberArray(input: string): number[] {
  return input
    .replace('\"', '')
    .split('\\n')
    .map(x => parseInt(x));
}