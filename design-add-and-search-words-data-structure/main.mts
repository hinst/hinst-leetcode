function match(a: string, b: string): boolean {
	if (a.length !== b.length)
		return false;
	let index = 0;
	for (const character1 of a) {
		const character2 = b.charAt(index);
		const matched = character2 === '.' || character1 === character2;
		if (!matched)
			return false;
		++index;
	}
	return true;
}

class WordDictionary {
	words = new Set<string>();

	constructor() {
	}

	addWord(word: string): void {
		this.words.add(word);
	}

	search(word: string): boolean {
		if (!word.includes('.'))
			return this.words.has(word);
		else
			for (const existingWord of this.words)
				if (match(existingWord, word))
					return true;
		return false;
	}
}

/**
* Your WordDictionary object will be instantiated and called as such:
* var obj = new WordDictionary()
* obj.addWord(word)
* var param_2 = obj.search(word)
*/

const wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
console.log(wordDictionary.search("pad")); // return False
console.log(wordDictionary.search("bad")); // return True
console.log(wordDictionary.search(".ad")); // return True
console.log(wordDictionary.search("b..")); // return True