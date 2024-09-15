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

function letterCombinations(digits: string, index: number = 0, texts: string[] = []): string[] {
    if (digits.length <= index)
        return texts;
    if (!texts.length)
        texts = [''];
    const newTexts: string[] = [];
    const letters = BUTTONS[digits[index]];
    for (const text of texts)
        for (const letter of letters)
            newTexts.push(text + letter);
    return letterCombinations(digits, index + 1, newTexts);
}

console.log(letterCombinations('23'));