function isMatch(text: string, pattern: string): boolean {
    // console.log('"' + text + '"', '"' + pattern + '"');
    if (text.length === 0 && pattern.length === 0)
        return true;
    if (pattern[0] === '.')
        return text.length > 0 && isMatch(text.substring(1), pattern.substring(1));
    if (pattern[0] === '*')
        return isMatchAny(text, pattern.substring(1));
    return text[0] === pattern[0] && isMatch(text.substring(1), pattern.substring(1));
};

function isMatchAny(text: string, pattern: string): boolean {
    for (let i = 0; i <= text.length; i++)
        if (isMatch(text.substring(i), pattern))
            return true;
    for (let i = 0; i <= text.length; i++)
        if (isMatch(text.substring(0, i), pattern))
            return true;
    return false;
}

console.log(isMatch('aab', 'c*a*b'));