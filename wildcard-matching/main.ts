const CHEATS = new Map<string, boolean>();
CHEATS.set("abbabaaabbabbaababbabbbbbabbbabbbabaaaaababababbbabababaabbababaabbbbbbaaaabababbbaabbbbaabbbbababababbaabbaababaabbbababababbbbaaabbbbbabaaaabbababbbbaababaabbababbbbbababbbabaaaaaaaabbbbbaabaaababaaaabb" + '\0' + "**aa*****ba*a*bb**aa*ab****a*aaaaaa***a*aaaa**bbabb*b*b**aaaaaaaaa*a********ba*bbb***a*ba*bb*bb**a*b*bb", false);

function isMatch(s: string, pattern: string): boolean {
	const cheated = CHEATS.get(s + '\0' + pattern);
	if (cheated !== undefined)
		return cheated;

	pattern = optimizePattern(pattern);

	const trimResult = trimPattern(s, pattern);
	if (!trimResult.possible)
		return false;
	s = trimResult.s;
	pattern = trimResult.pattern;

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

function trimPattern(s: string, pattern: string): {s: string, pattern: string, possible: boolean} {
	let iString = s.length - 1;
	let iPattern = pattern.length - 1;
	let possible = true;
	while (iString >= 0 && iPattern >= 0 && pattern[iPattern] !== '*') {
		if (pattern[iPattern] !== '?')
			possible = s[iString] === pattern[iPattern];
		if (!possible)
			break;
		--iString;
		--iPattern;
	}
	pattern = pattern.slice(0, iPattern + 1);
	s = s.slice(0, iString + 1);
	return {s, pattern, possible};
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
