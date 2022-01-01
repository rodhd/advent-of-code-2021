import {AdventPuzzle} from "../shared/AdventPuzzle";


export interface InsertionRule {
    pair: string,
    result: string
}

function parseInsertionRules(rawRule: string): InsertionRule {
    const {0: pair, 1: result} = rawRule.split(' -> ');
    return {
        pair,
        result
    }
}

export function getTemplateAndSteps(input: string): { template: string[], insertionRules: InsertionRule[] } {
    const {0: rawTemplate, 1: rawRules} = input.split('\n\n');
    return {
        template: [...rawTemplate],
        insertionRules: rawRules
            .split('\n')
            .filter(x => x !== '')
            .map(x => parseInsertionRules(x))
    };
}

export function doOneStep(input: string[], rules: InsertionRule[]): string[] {
    let resultTemplate = [];
    for (let i = 0; i < input.length - 1; i++) {
        const pair = input[i] + input[i + 1];
        const result = rules.find(x => x.pair === pair).result;
        resultTemplate.push(input[i], result)
    }
    resultTemplate.push(input[input.length - 1]);
    return resultTemplate;
}

type FrequencyDict = {
    [key: string]: number
}

export function calculateElementFrequency(polymer: string[]): number {
    let frequencyDict: FrequencyDict = {};
    polymer.forEach((element) => {
        if (Object.keys(frequencyDict).includes(element)) {
            frequencyDict[element] = frequencyDict[element] + 1;
        } else {
            frequencyDict[element] = 1;
        }
    });
    const orderedFreqs = Object.values(frequencyDict).sort((a, b) => b - a);
    return orderedFreqs[0] - orderedFreqs[orderedFreqs.length - 1];
}

export function doTenSteps(input: string): number {
    const {template, insertionRules} = getTemplateAndSteps(input);
    let polymer = template;
    for (let i = 0; i < 10; i++) {
        polymer = doOneStep(polymer, insertionRules);
    }
    return calculateElementFrequency(polymer);
}

export function initiliasePairDict(template: string[]): FrequencyDict {
    let frequencyDict: FrequencyDict = {};
    for (let i = 0; i < template.length - 1; i++) {
        const pair = template[i] + template[i + 1];
        if (Object.keys(frequencyDict).includes(pair)) {
            frequencyDict[pair] = frequencyDict[pair] + 1;
        } else {
            frequencyDict[pair] = 1;
        }
    }
    return frequencyDict;
}

function getResultingPairs(pair: string, rules: InsertionRule[]): [string, string] {
    const result = rules.find(x => x.pair === pair).result;
    return [pair[0] + result, result + pair[1]];
}

export function doOneStepImproved(frequencyDict: FrequencyDict, rules: InsertionRule[]): FrequencyDict {
    const pairs = Object.keys(frequencyDict);
    let newFreqs: FrequencyDict = {};
    pairs.forEach((pair) => {
        const [pairOne, pairTwo] = getResultingPairs(pair, rules);
        if (Object.keys(newFreqs).includes(pairOne)) {
            newFreqs[pairOne] = newFreqs[pairOne] + frequencyDict[pair];
        } else {
            newFreqs[pairOne] = frequencyDict[pair];
        }
        if (Object.keys(newFreqs).includes(pairTwo)) {
            newFreqs[pairTwo] = newFreqs[pairTwo] + frequencyDict[pair];
        } else {
            newFreqs[pairTwo] = frequencyDict[pair];
        }
    });
    return newFreqs;
}

export function doFortyStepsImproved(input: string): number {
    const {template, insertionRules} = getTemplateAndSteps(input);
    let freqs = initiliasePairDict(template);
    for (let i = 0; i < 40; i++) {
        freqs = doOneStepImproved(freqs, insertionRules);
    }
    const pairs = Object.keys(freqs);
    let elementFreqs: FrequencyDict = {}
    pairs.forEach((pair) => {
        const elementOne = pair[0];
        if (Object.keys(elementFreqs).includes(elementOne)) {
            elementFreqs[elementOne] = elementFreqs[elementOne] + freqs[pair];
        } else {
            elementFreqs[elementOne] = freqs[pair];
        }
    })
    elementFreqs[template[template.length - 1]] = elementFreqs[template[template.length - 1]] + 1
    const orderedFreqs = Object.values(elementFreqs).sort((a, b) => b - a);
    return orderedFreqs[0] - orderedFreqs[orderedFreqs.length - 1];
}

export class Dec14Puzzle extends AdventPuzzle {
    input: string;

    parseInput(input: string): void {
        this.input = input;
    }

    solveFirstPuzzle(): void {
        console.log(doTenSteps(this.input));
    }

    solveSecondPuzzle(): void {
        console.log(doFortyStepsImproved(this.input));
    }

}