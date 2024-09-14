function isMatch(text: string, pattern: string): boolean {
    if (text.length === 0 && pattern.length === 0)
        return true;
    if (pattern[0] === '.' && pattern[1] !== '*')
        return text.length > 0 && isMatch(text.substring(1), pattern.substring(1));
    if (pattern.length > 1 && pattern[1] === '*') {
        const character = pattern[0];
        const subPattern = pattern.substring(2);
        for (let i = 0; i <= text.length; i++) {
            if (isMatch(text.substring(i), subPattern))
                return true;
            if (character !== '.' && text[i] !== character)
                break;
        }
        return false;
    }
    return text[0] === pattern[0] && isMatch(text.substring(1), pattern.substring(1));
};

console.log(isMatch('ab', '.*'));