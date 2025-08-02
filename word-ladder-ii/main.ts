function findLadders(beginWord: string, endWord: string, wordList: string[]): string[][] {
	const finder = new Finder(beginWord, endWord, wordList);
	return finder.chains;
}

class Word {
	public readonly linked: Word[] = [];
	constructor(public readonly text: string) {}
}

class Finder {
	endWord = new Word('');
	words: Word[] = [];
	chains: string[][] = [];

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
		for (const word of this.words)
			console.log(word.text, word.linked.length);
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
