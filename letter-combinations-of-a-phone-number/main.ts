const BUTTONS: Record<string, string> = Object.freeze({
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz',
});

function letterCombinations(digits: string): string[] {
    if (!digits.length)
        return [];
    let texts = [''];
    for (const digit of digits) {
        const newTexts: string[] = [];
        const letters = BUTTONS[digit];
        for (const text of texts)
            for (const letter of letters)
                newTexts.push(text + letter);
        texts = newTexts;
    }
    return texts;
}

console.log(letterCombinations('23'));