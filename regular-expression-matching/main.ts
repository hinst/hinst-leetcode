function isMatch(text: string, pattern: string, iText: number = 0, iPattern: number = 0): boolean {
    if (text.length <= iText && pattern.length <= iPattern)
        return iText === text.length && iPattern === pattern.length;
    if (pattern[iPattern] === '.' && pattern[iPattern + 1] !== '*')
        return text.length > 0 && isMatch(text, pattern, iText + 1, iPattern + 1);
    if (pattern[iPattern + 1] === '*') {
        const character = pattern[iPattern];
        for (let i = 0; i <= text.length; ++i) {
            if (isMatch(text, pattern, iText + i, iPattern + 2))
                return true;
            if (character !== '.' && text[iText + i] !== character)
                break;
        }
        return false;
    }
    return text[iText] === pattern[iPattern] && isMatch(text, pattern, iText + 1, iPattern + 1);
};

console.log(isMatch('mississippi', 'mis*is*ip*.'));