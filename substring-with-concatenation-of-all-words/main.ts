class Permutations {
	constructor(
		private readonly sequence: Uint16Array,
		private readonly checkResponse: (index: number) => number[],
		public readonly postResponse: (index: number) => void,
	) {
		this.sequenceLength = sequence.length;
	}

	private readonly sequenceLength: number;

	private checkSwap(start: number, curr: number) {
		for (let i = start; i < curr; ++i)
			if (this.sequence[i] == this.sequence[curr])
				return false
		return true
	}

	findPerms(index: number) {
		if (index >= this.sequenceLength) {
			const characterIndexes = this.checkResponse(index);
			for (const characterIndex of characterIndexes)
				this.postResponse(characterIndex);
		}
		const isViable = index === 0 || this.checkResponse(index).length !== 0;
		for (let i = index; i < this.sequenceLength; ++i) {
			const shouldSwap = this.checkSwap(index, i);
			if (shouldSwap && isViable) {
				[this.sequence[index], this.sequence[i]] = [this.sequence[i], this.sequence[index]];
				this.findPerms(index+1);
				[this.sequence[index], this.sequence[i]] = [this.sequence[i], this.sequence[index]];
			}
		}
	}
}

class App {
	constructor(s: string, words: string[]) {
		this.words = words;
		this.matchedIndexes = App.createMatchedIndexes(s, words);
		this.currentWordIndexes = new Uint16Array(words.length);
		for (let i = 0; i < words.length; ++i)
			this.currentWordIndexes[i] = words.indexOf(words[i]);
	}

	private readonly words: string[];
	private readonly results = new Set<number>();
	private readonly matchedIndexes: Set<number>[];
	private readonly currentWordIndexes: Uint16Array;
	private walkCharacterIndexes: number[][] = [];

	private static createMatchedIndexes(s: string, wordArray: string[]): Set<number>[] {
		return new Array<Set<number>>(...wordArray.map(word => {
			const indexes = new Set<number>();
			for (
				let textIndex = s.indexOf(word);
				textIndex !== -1;
				textIndex = s.indexOf(word, textIndex + 1)
			)
				indexes.add(textIndex);
			return indexes;
		}));
	}

	private check(limit: number): number[] {
		const before = limit - 2;
		const current = limit - 1;
		const currentWordIndex = this.currentWordIndexes[current];
		const matchedIndex = this.matchedIndexes[currentWordIndex];
		let results: number[] = [];
		if (limit === 1) {
			this.walkCharacterIndexes = new Array(this.words.length);
			this.walkCharacterIndexes[0] = Array.from(matchedIndex);
			for (let i = 1; i < this.walkCharacterIndexes.length; ++i)
				this.walkCharacterIndexes[i] = new Array(matchedIndex.size);
			results = this.walkCharacterIndexes[0];
		} else {
			const previousIndexes = this.walkCharacterIndexes[before];
			const nextIndexes = this.walkCharacterIndexes[current];
			for (let i = 0; i < previousIndexes.length; ++i) {
				const nextCharacterIndex = previousIndexes[i] + this.words[currentWordIndex].length;
				nextIndexes[i] = previousIndexes[i] == -1 ?
					-1
					: matchedIndex.has(nextCharacterIndex) ? nextCharacterIndex : -1;
			}
			results = this.walkCharacterIndexes[0].filter((_, i) => nextIndexes[i] !== -1);
		}
		return results;
	}

	findSubstring(): number[] {
		const permutations = new Permutations(
			this.currentWordIndexes,
			this.check.bind(this),
			index => this.results.add(index)
		);
		permutations.findPerms(0);
		return Array.from(this.results);
	}
}

function findSubstring(s: string, words: string[]): number[] {
	if (s === words.join(''))
		return [0];
	return new App(s, words).findSubstring();
}

import * as Data from './data.ts';

function main() {
	let s: string;
	let words: string[];

	s = Data.s; words = Data.words;
	console.time('done');
	console.log(findSubstring(s, words));
	console.timeEnd('done');
}
main();