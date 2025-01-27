function isInterleave(s1: string, s2: string, combinedText: string): boolean {
	return new Advance(
		createArray(s1),
		createArray(s2),
		createArray(combinedText)
	).next(0, 0, 0);
}

function createArray(s: string) {
	return new Uint16Array(Array.from(s).map(item => item.charCodeAt(0)));
}

class Advance {
	private cache = new Map<number, boolean>();

	constructor(
		public readonly s1: Uint16Array,
		public readonly s2: Uint16Array,
		public readonly combinedText: Uint16Array) {
	}

	next(index1: number, index2: number, combinedIndex: number): boolean {
		const cacheKey = index1 + index2 * 100 + combinedIndex * 100 * 200;
		let answer = this.cache.get(cacheKey);
		if (answer !== undefined)
			return answer;

		if (combinedIndex >= this.combinedText.length)
			return index1 === this.s1.length && index2 === this.s2.length;
		const canAdvance1 = this.combinedText[combinedIndex] === this.s1[index1] &&
			this.next(index1 + 1, index2, combinedIndex + 1);
		const canAdvance2 = this.combinedText[combinedIndex] === this.s2[index2] &&
			this.next(index1, index2 + 1, combinedIndex + 1);
		answer = canAdvance1 || canAdvance2;
		this.cache.set(cacheKey, answer);
		return answer;
	}
}

if (import.meta.main) {
	console.time('computing');
	console.log(isInterleave('accbaabaaabbcbaacbababacaababbcbabaababcaabbbbbcacbaa', 'cabaabcbabcbaaaacababccbbccaaabaacbbaaabccacabaaccbbcbcb', 'accbcaaabbaabaaabbcbcbabacbacbababaacaaaaacbabaabbcbccbbabbccaaaaabaabcabbcaabaaabbcbcbbbcacabaaacccbbcbbaacb'));
	console.timeEnd('computing');
}
