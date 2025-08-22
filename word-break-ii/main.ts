function wordBreak(s: string, wordDict: string[]): string[] {
	const instance = new WordBreak(s, wordDict);
	instance.next(0);
	return Array.from(instance.answers);
}

class WordBreak {
	public readonly answers = new Set<string>();
	private readonly chain: string[] = [];

	constructor(
		private readonly s: string,
		private readonly wordDict: string[]
	) {
	}

	next(index: number) {
		if (index === this.s.length)
			this.answers.add(this.chain.join(' '));
		for (const word of this.wordDict) {
			if (this.s.indexOf(word, index) === index) {
				this.chain.push(word);
				this.next(index + word.length);
				this.chain.pop();
			}
		}
		return false;
	}
}

if (import.meta.main) {
	const s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"];
	console.log(wordBreak(s, wordDict));
}
