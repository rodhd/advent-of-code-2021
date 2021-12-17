import {calculateMissingValuesScore, calculateTotalErrorScore} from "../scripts/dec-10";


const input = ['[({(<(())[]>[[{[]{<()<>>',
    '[(()[<>])]({[<{<<[]>>(',
    '{([(<{}[<>[]}>{[]{[(<()>',
    '(((({<>}<{<{<>}{[]{[]{}',
    '[[<[([]))<([[{}[[()]]]',
    '[{[{({}]{}}([{[{{{}}([]',
    '{<[[]]>}<{[{[{[]{()[[[]',
    '[<(<(<(<{}))><([]([]()',
    '<{([([[(<>()){}]>(<<{{',
    '<{([{{}}[<[[[<>{}]]]>[]]'];

test('Day 10, Puzzle 1', () => {
    expect(calculateTotalErrorScore(input)).toBe(26397);
})

test('Day 10, Puzzle 2', () => {
    expect(calculateMissingValuesScore(input)).toBe(288957);
})