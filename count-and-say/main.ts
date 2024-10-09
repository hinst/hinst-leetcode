function countAndSay(n: number): string {
    let currentString = '1';
    for (let i = 1; i < n; ++i) {
        let nextString = '';
        let previousCharacter = '';
        let count = 0;
        for (let i = 0; i < currentString.length; ++i) {
            const currentCharacter = currentString[i];
            if (previousCharacter === currentCharacter)
                ++count;
            else {
                if (previousCharacter.length)
                    nextString += count + previousCharacter;
                count = 1;
                previousCharacter = currentCharacter;
            }
        }
        nextString += count + previousCharacter;
        currentString = nextString;
    }
    return currentString;
}

console.log(countAndSay(4));