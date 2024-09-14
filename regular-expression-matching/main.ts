function isMatch(text: string, pattern: string, textIndex: number = 0, patternIndex: number = 0): boolean {
    if (text.length <= textIndex && pattern.length <= patternIndex)
        return textIndex === text.length && patternIndex === pattern.length;
    if (pattern[patternIndex] === '.' && pattern[patternIndex + 1] !== '*')
        return text.length > 0 && isMatch(text, pattern, textIndex + 1, patternIndex + 1);
    if (pattern[patternIndex + 1] === '*') {
        const character = pattern[patternIndex];
        for (let i = 0; i <= text.length; i++) {
            if (isMatch(text, pattern, textIndex + i, patternIndex + 2))
                return true;
            if (character !== '.' && text[textIndex + i] !== character)
                break;
        }
        return false;
    }
    return text[textIndex] === pattern[patternIndex] && isMatch(text, pattern, textIndex + 1, patternIndex + 1);
};

console.log(isMatch('mississippi', 'mis*is*ip*.'));