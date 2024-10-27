function isMatch(s: string, pattern: string): boolean {
	let optimizedPattern = '';
	let previousCharacter = '_';
	for (const character of pattern) {
		const isRepeating = character === '*' && previousCharacter === '*';
		if (!isRepeating)
			optimizedPattern += character;
		previousCharacter = character;
	}
	return check(s, 0, optimizedPattern, 0);
}

function check(s: string, sIndex: number, pattern: string, patternIndex: number): boolean {
	if (sIndex === s.length && patternIndex === pattern.length)
		return true;
	if (pattern[patternIndex] === '?')
		return s[sIndex] != null && check(s, sIndex + 1, pattern, patternIndex + 1);
	if (pattern[patternIndex] === '*') {
		const nextPatternIndex = patternIndex + 1;
		for (let i = sIndex; i <= s.length; ++i)
			if (check(s, i, pattern, nextPatternIndex))
				return true;
	}
	return s[sIndex] === pattern[patternIndex] &&
		check(s, sIndex + 1, pattern, patternIndex + 1);
}

export const isMatchExported = isMatch;

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	console.log(isMatch('aa', 'a'));
	console.log(isMatch('a', 'a'));
}
