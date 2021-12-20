import {getNeighbors, StepResult, stepWhenAllFlash, takeHundredSteps, takeOneStep} from "../scripts/dec-11";

const neighborStart = [3, 0];
const neighborResult = [[2, 0], [2, 1], [3, 1], [4, 1], [4, 0]]

test('Get Neighbors Test', () => {
    expect(getNeighbors(neighborStart[0], neighborStart[1])).toStrictEqual(neighborResult)
})

const topRightNeighbor = [0, 9];
const topRightNeighborResult = [[1, 9], [1, 8], [0, 8]]

test('Get Neighbors Test 2', () => {
    expect(getNeighbors(topRightNeighbor[0], topRightNeighbor[1])).toStrictEqual(topRightNeighborResult)
})

const beforeStep = [
    [1, 1, 1, 1, 1],
    [1, 9, 9, 9, 1],
    [1, 9, 1, 9, 1],
    [1, 9, 9, 9, 1],
    [1, 1, 1, 1, 1]
];

const afterStep = [
    [3, 4, 5, 4, 3],
    [4, 0, 0, 0, 4],
    [5, 0, 0, 0, 5],
    [4, 0, 0, 0, 4],
    [3, 4, 5, 4, 3]
];

const afterStepResult: StepResult = {
    flashes: 9,
    result: afterStep
}

test('One Step Test', () => {
    expect(takeOneStep(beforeStep)).toStrictEqual(afterStepResult);
})

const beforeHundredSteps = [
    [5, 4, 8, 3, 1, 4, 3, 2, 2, 3],
    [2, 7, 4, 5, 8, 5, 4, 7, 1, 1],
    [5, 2, 6, 4, 5, 5, 6, 1, 7, 3],
    [6, 1, 4, 1, 3, 3, 6, 1, 4, 6],
    [6, 3, 5, 7, 3, 8, 5, 4, 7, 8],
    [4, 1, 6, 7, 5, 2, 4, 6, 4, 5],
    [2, 1, 7, 6, 8, 4, 1, 7, 2, 1],
    [6, 8, 8, 2, 8, 8, 1, 1, 3, 4],
    [4, 8, 4, 6, 8, 4, 8, 5, 5, 4],
    [5, 2, 8, 3, 7, 5, 1, 5, 2, 6]
];

const afterOneStepLarge = [
    [6, 5, 9, 4, 2, 5, 4, 3, 3, 4],
    [3, 8, 5, 6, 9, 6, 5, 8, 2, 2],
    [6, 3, 7, 5, 6, 6, 7, 2, 8, 4],
    [7, 2, 5, 2, 4, 4, 7, 2, 5, 7],
    [7, 4, 6, 8, 4, 9, 6, 5, 8, 9],
    [5, 2, 7, 8, 6, 3, 5, 7, 5, 6],
    [3, 2, 8, 7, 9, 5, 2, 8, 3, 2],
    [7, 9, 9, 3, 9, 9, 2, 2, 4, 5],
    [5, 9, 5, 7, 9, 5, 9, 6, 6, 5],
    [6, 3, 9, 4, 8, 6, 2, 6, 3, 7]
]

const afterOneStepLargeResult: StepResult = {
    flashes: 0,
    result: afterOneStepLarge
}

test('After one step 2', () => {
    expect(takeOneStep(beforeHundredSteps)).toStrictEqual(afterOneStepLargeResult);
})

test('One Hundred Steps Test', () => {
    expect(takeHundredSteps(beforeHundredSteps)).toBe(1656);
})

test('All octupuses are flashing test', () => {
    expect(stepWhenAllFlash(beforeHundredSteps)).toBe(195);
})