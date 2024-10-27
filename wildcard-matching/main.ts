function isMatch(s: string, pattern: string): boolean {
	pattern = optimizePattern(pattern);
	let letterCount = 0;
	for (const character of pattern)
		if (character !== '*')
			++letterCount;
	return check(s, 0, pattern, 0, letterCount);
}

function optimizePattern(pattern: string): string {
	let optimizedPattern = '';
	let previousCharacter = '_';
	for (const character of pattern) {
		const isRepeating = character === '*' && previousCharacter === '*';
		if (!isRepeating)
			optimizedPattern += character;
		previousCharacter = character;
	}
	return optimizedPattern;
}

function check(s: string, sIndex: number, pattern: string, patternIndex: number, remainingLetterCount: number): boolean {
	if (sIndex === s.length && patternIndex === pattern.length)
		return true;
	if (pattern[patternIndex] === '?')
		return s[sIndex] != null && check(s, sIndex + 1, pattern, patternIndex + 1, remainingLetterCount - 1);
	if (pattern[patternIndex] === '*') {
		const nextPatternIndex = patternIndex + 1;
		for (let i = sIndex; i <= s.length - remainingLetterCount; ++i) {
			if (check(s, i, pattern, nextPatternIndex, remainingLetterCount))
				return true;
		}
	}
	return s[sIndex] === pattern[patternIndex] &&
		check(s, sIndex + 1, pattern, patternIndex + 1, remainingLetterCount - 1);
}

export const isMatchExported = isMatch;

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	const s = "abbabaaabbabbaababbabbbbbabbbabbbabaaaaababababbbabababaabbababaabbbbbbaaaabababbbaabbbbaabbbbababababbaabbaababaabbbababababbbbaaabbbbbabaaaabbababbbbaababaabbababbbbbababbbabaaaaaaaabbbbbaabaaababaaaabb";
	const pattern = "**aa*****ba*a*bb**aa*ab****a*aaaaaa***a*aaaa**bbabb*b*b**aaaaaaaaa*a********ba*bbb***a*ba*bb*bb**a*b*bb";
	console.log(isMatch(s, pattern));
}
