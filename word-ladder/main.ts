function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
	const finder = new Finder(beginWord, endWord, wordList);
	finder.find();
	return finder.endWord.step + 1;
}

class Word {
	public readonly linked: Word[] = [];
	public step = -1;
	constructor(public readonly text: string) {}
}

class Finder {
	endWord = new Word('');
	words: Word[] = [];

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

	find(): number {
		const length = this.findPath();
		return length;
	}

	findPath(sources: Word[] = [this.words[0]]): number {
		let step = 0;
		let nextSources: Word[] = [];
		while (this.endWord.step === -1 && sources.length) {
			++step;
			for (const source of sources) {
				for (const linkedSource of source.linked) {
					if (linkedSource.step === -1) {
						linkedSource.step = step;
						nextSources.push(linkedSource);
					}
				}
			}
			sources = nextSources;
			nextSources = [];
		}
		return step;
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
	// const beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"];
	const beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"];
	console.time('findLadders');
	console.log(ladderLength(beginWord, endWord, wordList));
	console.timeEnd('findLadders');
}
