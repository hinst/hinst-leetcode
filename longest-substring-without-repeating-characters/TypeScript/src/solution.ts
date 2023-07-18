export function lengthOfLongestSubstring(s: string): number {
    const characters = [...s];
    let maxLength = 0;
    let startIndex = 0;
    let endIndex = 0;
    const map: Record<string, boolean> = {};
    while (endIndex < s.length) {
        const currentCharacter = characters[endIndex];
        while (map[currentCharacter]) {
            delete map[characters[startIndex]];
            startIndex++;
        }
        map[currentCharacter] = true;
        endIndex++;
        const currentLength = endIndex - startIndex;
        if (currentLength > maxLength)
            maxLength = currentLength;
    }
    return maxLength;
};