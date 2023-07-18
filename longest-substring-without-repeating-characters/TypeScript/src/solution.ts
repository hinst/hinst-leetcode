export function lengthOfLongestSubstring(s: string): number {
    const characters = [...s];
    function checkRepetitions(startIndex: number, endIndex: number) {
        const map: Record<string, boolean> = {};
        for (let i = startIndex; i < endIndex; i++) {
            const character = characters[i];
            if (map[character])
                return true;
            else
                map[character] = true;
        }
    }
    for (let candidateLength = s.length; candidateLength >= 0; candidateLength--) {
        const wiggleRoom = s.length - candidateLength;
        for (let startIndex = 0; startIndex <= wiggleRoom; startIndex++) {
            const endIndex = startIndex + candidateLength;
            const hasRepetitions = checkRepetitions(startIndex, endIndex);
            if (!hasRepetitions)
                return candidateLength;
        }
    }
    return 0;
};