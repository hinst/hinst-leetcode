function findLadders(beginWord: string, endWord: string, wordList: string[]): string[][] {
	const finder = new Finder(beginWord, endWord, wordList);
	finder.find();
	return finder.chains.map(chain => chain.map(word => word.text).reverse());
}

class Word {
	public readonly linked: Word[] = [];
	public step = -1;
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

	find(): number {
		const length = this.findPath();
		this.words[0].step = 0;
		this.findChains();
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

	findChains(source: Word = this.endWord, chain: Word[] = []) {
		chain.push(source);
		if (source.step === 0) {
			this.chains.push(chain.slice());
		} else {
			const previousStep = source.step - 1;
			for (const linkedNode of source.linked) {
				if (linkedNode.step === previousStep) {
					this.findChains(linkedNode, chain);
				}
			}
		}
		chain.pop();
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
	// const beginWord = "qa";
	// const endWord = "sq";
	// const wordList = ["si","go","se","cm","so","ph","mt","db","mb","sb","kr","ln","tm","le","av","sm","ar","ci","ca","br","ti","ba","to","ra","fa","yo","ow","sn","ya","cr","po","fe","ho","ma","re","or","rn","au","ur","rh","sr","tc","lt","lo","as","fr","nb","yb","if","pb","ge","th","pm","rb","sh","co","ga","li","ha","hz","no","bi","di","hi","qa","pi","os","uh","wm","an","me","mo","na","la","st","er","sc","ne","mn","mi","am","ex","pt","io","be","fm","ta","tb","ni","mr","pa","he","lr","sq","ye"];
	console.time('findLadders');
	console.log(findLadders(beginWord, endWord, wordList));
	console.timeEnd('findLadders');
}
