export function parseStringArray(input: string): string[] {
  return input
    .replace('\"', '')
    .split('\\n')
    .filter(x => x.length > 2);
}