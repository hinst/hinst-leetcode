class Permutator<T> {
	private shouldSwap(s: T[], start: number, curr: number) {
		for (let i = start; i < curr; ++i)
			if (s[i] == s[curr])
				return false
		return true
	}

	findPerms(s: T[], index: number, n: number, res: (s: T[]) => void) {
		if (index >= n) {
			res(s);
			return;
		}
		for (let i = index; i < n; ++i) {
			const check = this.shouldSwap(s, index, i);
			if (check) {
				[s[index], s[i]] = [s[i], s[index]];
				this.findPerms(s, index+1, n, res);
				[s[index], s[i]] = [s[i], s[index]];
			}
		}
	}
}

class App {
	constructor(s: string, private words: string[]) {
		this.matchedIndexes = App.createMatchedIndexes(s, words);
		this.currentIndexes = new Uint16Array(words.length);
		this.availableIndexes = new Set(words.map((_, index) => index));
	}
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

	s = Data.s; words = Data.words;
	const permutator = new Permutator<string>();
	permutator.findPerms(words, 0, words.length, output => console.log(output.join('-')));
	return;
	console.log(findSubstring(s, words));
	console.warn('---');
}
main();