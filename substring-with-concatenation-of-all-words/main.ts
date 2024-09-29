type QuickSet = Set<number> | number | undefined;

function quickSetHas(set: QuickSet, item: number): boolean {
	if (set === undefined)
		return false;
	return typeof set === 'number' ? set === item : set.has(item);
}

function quickSetAdd(set: QuickSet | undefined, item: number): QuickSet {
	if (typeof set === 'undefined')
		return item;
	if (typeof set === 'number')
		set = new Set<number>([set]);
	set.add(item);
	return set;
}

class Permutations {
	constructor(
		private readonly sequence: Uint16Array,
		private readonly checkResponse: (index: number, build: boolean) => number[] | boolean,
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
			const characterIndexes = this.checkResponse(index, true) as number[];
			for (const characterIndex of characterIndexes)
				this.postResponse(characterIndex);
		}
		const isViable = index === 0 || this.checkResponse(index, false);
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
		this.walkCharacterIndexes = new Array(this.words.length).fill([])
			.map(() => new Array<number>());
	}

	private readonly words: string[];
	private readonly results = new Set<number>();
	private readonly matchedIndexes: QuickSet[];
	private readonly currentWordIndexes: Uint16Array;
	private readonly walkCharacterIndexes: number[][];

	private static createMatchedIndexes(s: string, wordArray: string[]): QuickSet[] {
		return new Array<QuickSet>(...wordArray.map(word => {
			let indexes: QuickSet | undefined = undefined;
			for (
				let textIndex = s.indexOf(word);
				textIndex !== -1;
				textIndex = s.indexOf(word, textIndex + 1)
			)
				indexes = quickSetAdd(indexes, textIndex);
			return indexes || new Set<number>();
		}));
	}

	private check(limit: number, build: boolean): boolean | number[] {
		const before = limit - 2;
		const current = limit - 1;
		const currentWordIndex = this.currentWordIndexes[current];
		const matchedIndex = this.matchedIndexes[currentWordIndex];
		if (limit === 1) {
			this.walkCharacterIndexes[0] = typeof matchedIndex === 'undefined'
				? []
				: typeof matchedIndex === 'number'
					? [matchedIndex]
					: Array.from(matchedIndex);
			return build ? this.walkCharacterIndexes[0] : this.walkCharacterIndexes[0].length > 0;
		} else {
			const previousIndexes = this.walkCharacterIndexes[before];
			const nextIndexes = this.walkCharacterIndexes[current];
			const currentWordLength = this.words[currentWordIndex].length;
			let haveNext = false;
			for (let i = 0; i < previousIndexes.length; ++i) {
				const nextCharacterIndex = previousIndexes[i] + currentWordLength;
				if (previousIndexes[i] == -1 || !quickSetHas(matchedIndex, nextCharacterIndex))
					nextIndexes[i] = -1;
				else {
					nextIndexes[i] = nextCharacterIndex;
					haveNext = true;
				}
			}
			return build
				? this.walkCharacterIndexes[0].filter((_, i) => nextIndexes[i] !== -1)
				: haveNext;
		}
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