function wordBreak(s: string, wordDict: string[]): boolean {
	const instance = new WordBreak(s, wordDict);
	return instance.next(0);
}

class WordBreak {
	private readonly cache = new Map<number, boolean>();

	constructor(
		private readonly s: string,
		private readonly wordDict: string[]
	) {
	}

	nextCached(index: number) {
		let cached = this.cache.get(index);
		if (cached !== undefined)
			return cached;
		cached = this.next(index);
		this.cache.set(index, cached);
		return cached;
	}

	next(index: number): boolean {
		if (index === this.s.length)
			return true;
		for (const word of this.wordDict) {
			if (this.s.indexOf(word, index) === index) {
				if (this.nextCached(index + word.length))
					return true;
			}
		}
		return false;
	}
}


export const wordBreakEx = wordBreak;

if (import.meta.main) {
	const s = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab", wordDict = ["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"];
	console.log(wordBreak(s, wordDict));
}
