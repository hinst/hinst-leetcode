class Matcher {
	readonly cache = new Map<number, boolean>();

	constructor(private s: string, private pattern: string) {
		this.pattern = optimizePattern(this.pattern);
	}

	isMatch(): boolean {
		const trimResult = trimPattern(this.s, this.pattern);
		if (!trimResult.possible)
			return false;
		this.s = trimResult.s;
		this.pattern = trimResult.pattern;

		let letterCount = 0;
		for (const character of this.pattern)
			if (character !== '*')
				++letterCount;

		return this.checkCached(0, 0, letterCount);
	}

	private checkCached(sIndex: number, patternIndex: number, remainingLetterCount: number): boolean {
		const cacheKey = sIndex + patternIndex * 2048;
		const cachedResult = this.cache.get(cacheKey);
		if (cachedResult !== undefined)
			return cachedResult;
		const result = this.check(sIndex, patternIndex, remainingLetterCount);
		this.cache.set(cacheKey, result);
		return result;
	}

	private check(sIndex: number, patternIndex: number, remainingLetterCount: number): boolean {
		if (sIndex === this.s.length && patternIndex === this.pattern.length)
			return true;
		if (this.pattern[patternIndex] === '?')
			return this.s[sIndex] != null &&
				this.checkCached(sIndex + 1, patternIndex + 1, remainingLetterCount - 1);
		if (this.pattern[patternIndex] === '*') {
			const nextPatternIndex = patternIndex + 1;
			const limit = this.s.length - remainingLetterCount;
			if (patternIndex === this.pattern.length - 1)
				return true;
			else if (this.pattern[nextPatternIndex] !== '?') {
				sIndex = this.s.indexOf(this.pattern[nextPatternIndex], sIndex);
				if (sIndex === -1)
					return false;
			}
			for (let i = sIndex; i <= limit; ++i)
				if (this.checkCached(i, nextPatternIndex, remainingLetterCount))
					return true;
		}
		return this.s[sIndex] === this.pattern[patternIndex] &&
			this.checkCached(sIndex + 1, patternIndex + 1, remainingLetterCount - 1);
	}
}

function isMatch(s: string, pattern: string): boolean {
	return new Matcher(s, pattern).isMatch();
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

export const isMatchExported = isMatch;

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	const s = "aa";
	const pattern = "*";
	console.time('isMatch');
	console.log(isMatch(s, pattern));
	console.timeEnd('isMatch');
}
