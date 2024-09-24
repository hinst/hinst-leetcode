class Permutator {
	constructor(s: Uint16Array) {
		this.s = s;
		this.n = s.length;
	}

	public readonly s: Uint16Array
	public res: () => void = () => {};
	private readonly n: number;

	private shouldSwap(start: number, curr: number) {
		for (let i = start; i < curr; ++i)
			if (this.s[i] == this.s[curr])
				return false
		return true
	}

	findPerms(index: number) {
		if (index >= this.n) {
			this.res();
			return;
		}
		for (let i = index; i < this.n; ++i) {
			const check = this.shouldSwap(index, i);
			if (check) {
				[this.s[index], this.s[i]] = [this.s[i], this.s[index]];
				this.findPerms(index+1);
				[this.s[index], this.s[i]] = [this.s[i], this.s[index]];
			}
		}
	}
}

class App {
	constructor(s: string, words: string[]) {
		this.words = words;
		this.matchedIndexes = App.createMatchedIndexes(s, words);
		this.currentIndexes = new Uint16Array(words.length);
		this.availableIndexes = new Set(words.map((_, index) => index));
	}
	private readonly words: string[];
	private readonly results = new Set<number>();
	private readonly matchedIndexes: Set<number>[];
	private readonly availableIndexes = new Set<number>();
	private readonly currentIndexes: Uint16Array;
	private currentSize = 0;
	private firstCharacterIndex = -1;
	private sumCharacterIndex = 0;

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

	private check() {
		if (this.currentSize === this.words.length)
			this.results.add(this.firstCharacterIndex);
		for (const availableIndex of new Uint16Array(this.availableIndexes)) {
			this.availableIndexes.delete(availableIndex);
			this.currentIndexes[this.currentSize++] = availableIndex;
			const offset = this.words[availableIndex].length;
			this.sumCharacterIndex += offset;
			if (this.matchedIndexes[availableIndex].has(this.sumCharacterIndex))
				this.check();
			this.sumCharacterIndex -= offset;
			--this.currentSize;
			this.availableIndexes.add(availableIndex);
		}
	}

	findSubstring(): number[] {
		for (const matchedIndex of this.matchedIndexes)
			if (!matchedIndex.size)
				return [];
		for (let availableIndex = 0; availableIndex < this.words.length; ++availableIndex) {
			this.availableIndexes.delete(availableIndex);
			this.currentIndexes[this.currentSize++] = availableIndex;
			for (const characterIndex of this.matchedIndexes[availableIndex]) {
				this.sumCharacterIndex = characterIndex;
				this.firstCharacterIndex = characterIndex;
				if (!this.results.has(this.firstCharacterIndex))
					this.check();
			}
			--this.currentSize;
			this.availableIndexes.add(availableIndex);
		}
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

	s = Data.s; words = Data.words.slice(0,40);
	const intWords = new Uint16Array(words.length);
	for (let i = 0; i < words.length; ++i)
		intWords[i] = words.indexOf(words[i]);
	let counter = 0;
	const permutator = new Permutator(intWords);
	permutator.res = () => {
		++counter;
		if (counter % 100_000_000 === 0)
			console.log(counter, permutator.s.join(''));
	}
	permutator.findPerms(0);
	return;
	console.log(findSubstring(s, words));
	console.warn('---');
}
main();