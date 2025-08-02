function findLadders(beginWord: string, endWord: string, wordList: string[]): string[][] {
	const finder = new Finder(beginWord, endWord, wordList);
	console.log(finder.find());
	return finder.chains.map(chain => chain.map(word => word.text));
}

class Word {
	public readonly linked: Word[] = [];
	constructor(public readonly text: string) {}
}

class Finder {
	endWord = new Word('');
	words: Word[] = [];
	chains: Word[][] = [];
	visitedWords: Set<Word> = new Set();

	constructor(beginWord: string, endWord: string, dictionary: string[]) {
		this.words.push(new Word(beginWord));
		for (const word of dictionary) {
			const wordObject = new Word(word);
			this.words.push(wordObject);
			if (word === endWord)
				this.endWord = wordObject;
		}
		for (const word of this.words) {
			for (const otherWord of this.words) {
				if (word === otherWord)
					continue;
				if (checkLinkedWords(word.text, otherWord.text))
					word.linked.push(otherWord);
			}
		}
	}

	find(chain: Word[] = [this.words[0]], node: Word = this.words[0]): number {
		if (this.endWord.text === '')
			return -1;
		if (this.visitedWords.has(node))
			return -1;
		if (this.chains.length && this.chains[0].length < chain.length)
			return -1;
		if (node === this.endWord) {
			if (this.chains[0]?.length > chain.length)
				this.chains.length = 0;
			this.chains.push(chain.slice());
			return chain.length;
		}
		this.visitedWords.add(node);
		let minLength = -1;
		for (const linkedNode of node.linked) {
			chain.push(linkedNode);
			const length = this.find(chain, linkedNode);
			if (-1 === minLength || length < minLength)
				minLength = length;
			chain.pop();
		}
		this.visitedWords.delete(node);
		return minLength;
	}
}

function checkLinkedWords(a: string, b: string) {
	if (a.length !== b.length)
		return false;
	let diffCount = 0;
	for (let i = 0; i < a.length; ++i) {
		if (a[i] !== b[i])
			++diffCount;
		if (diffCount > 1)
			break;
	}
	return diffCount <= 1;
}


if (import.meta.main) {
	const beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"];
	console.log(findLadders(beginWord, endWord, wordList));
}
