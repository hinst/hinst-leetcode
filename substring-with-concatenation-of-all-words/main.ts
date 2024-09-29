const MAX_UINT16 = 65535;

class QuickSet {
	v?: number;
	s?: Set<number>;
	mi?: number;
	ma?: number;

	add(item: number) {
		if (this.s)
			this.s.add(item);
		else if (this.v !== undefined) {
			this.s = new Set<number>();
			this.s.add(this.v);
			this.v = undefined;
			this.s.add(item);
		} else
			this.v = item;
		if (this.mi === undefined || this.mi > item)
			this.mi = item;
		if (this.ma === undefined || this.ma < item)
			this.ma = item;
	}

	has(item: number): boolean {
		if (this.s)
			return this.s.has(item);
		else if (this.v !== undefined)
			return this.v === item;
		return false;
	}

	getSize(): number {
		if (this.s)
			return this.s.size;
		else if (this.v !== undefined)
			return 1;
		return 0;
	}

	copyIntoUint16Array(array: Uint16Array): number {
		if (this.s) {
			let i = 0;
			for (const item of this.s) {
				array[i] = item;
				++i;
			}
			return i;
		} else if (this.v !== undefined) {
			array[0] = this.v;
			return 1;
		}
		return 0;
	}

	hasAfterSet(borderSet: QuickSet): boolean {
		if (this.mi === undefined || borderSet.ma === undefined)
			return false;
		return this.mi <= borderSet.ma;
	}
}

class Permutations {
	constructor(
		private readonly sequence: Uint16Array,
		private readonly checkResponse: (index: number, build: boolean) => boolean | Uint16Array,
		private readonly checkCanSwap: (aIndex: number, bIndex: number) => boolean,
		public readonly postResponse: (index: number) => void,
	) {
		this.sequenceLength = sequence.length;
	}

	private readonly sequenceLength: number;

	private checkSwap(start: number, curr: number) {
		if (start === 0 && curr === 0)
			return true;
		if (!this.checkCanSwap(start, curr))
			return false;
		for (let i = start; i < curr; ++i)
			if (this.sequence[i] == this.sequence[curr])
				return false
		return true
	}

	findPerms(index: number) {
		if (index >= this.sequenceLength) {
			const characterIndexes = this.checkResponse(index, true) as Uint16Array;
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
	constructor(
		s: string,
		private readonly words: string[],
	) {
		this.matchedIndexes = this.createMatchedIndexes(s, words);
		this.currentWordIndexes = new Uint16Array(words.length);
		for (let i = 0; i < words.length; ++i)
			this.currentWordIndexes[i] = words.indexOf(words[i]);
		this.walkCharacterIndexes = new Array(this.words.length).fill([])
			.map(() => new Uint16Array(this.maxMultiMatch));
	}

	private readonly results = new Set<number>();
	private readonly matchedIndexes: QuickSet[];
	private readonly currentWordIndexes: Uint16Array;
	private readonly walkCharacterIndexes: Uint16Array[];
	private walkCharacterLength: number = 0;
	private minWordLength: number = Number.MAX_SAFE_INTEGER;
	private maxMatchPosition: number = 0;
	private maxMultiMatch: number = Number.MIN_SAFE_INTEGER;

	private createMatchedIndexes(s: string, wordArray: string[]): QuickSet[] {
		const matchMap = new Map<string, QuickSet>();
		return wordArray.map(word => {
			let indexes = matchMap.get(word);
			if (indexes !== undefined)
				return indexes;
			indexes = new QuickSet();
			for (
				let textIndex = s.indexOf(word);
				textIndex !== -1;
				textIndex = s.indexOf(word, textIndex + 1)
			) {
				indexes.add(textIndex);
				const textEndIndex = textIndex + word.length;
				if (this.maxMatchPosition < textEndIndex)
					this.maxMatchPosition = textEndIndex;
			}
			if (word.length < this.minWordLength)
				this.minWordLength = word.length;
			const size = indexes.getSize();
			if (this.maxMultiMatch < size)
				this.maxMultiMatch = size;
			matchMap.set(word, indexes);
			return indexes;
		});
	}

	private printDebugInfo(limit: number) {
		console.log(
			' '.repeat(limit),
			limit,
			Array.from(this.currentWordIndexes)
				.map((currentIndex, i) => i < limit ? this.words[currentIndex] : '_')
				.join(''),
			Array.from(this.walkCharacterIndexes[0]).map((index, i) => this.walkCharacterIndexes[limit - 1][i] !== MAX_UINT16 ? index : '_').join(),
		);
	}

	private check(limit: number, build: boolean): boolean | Uint16Array {
		const before = limit - 2;
		const current = limit - 1;
		const currentWordIndex = this.currentWordIndexes[current];
		const matchedIndex = this.matchedIndexes[currentWordIndex];
		if (limit === 1) {
			this.walkCharacterLength = matchedIndex.copyIntoUint16Array(this.walkCharacterIndexes[0]);
			return build
				? this.walkCharacterIndexes[0].slice(0, this.walkCharacterLength)
				: this.walkCharacterLength > 0 && !this.walkCharacterIndexes[0].every(index => this.results.has(index));
		} else {
			const previousIndexes = this.walkCharacterIndexes[before];
			const nextIndexes = this.walkCharacterIndexes[current];
			const currentWordLength = this.words[currentWordIndex].length;
			let haveNext = false;
			const remainingWordCount = this.words.length - limit;
			const requiredLength = remainingWordCount * this.minWordLength;
			for (let i = 0; i < this.walkCharacterLength; ++i) {
				if (previousIndexes[i] == MAX_UINT16) {
					nextIndexes[i] = MAX_UINT16;
					continue;
				}
				const nextCharacterIndex = previousIndexes[i] + currentWordLength;
				const remainingLength = this.maxMatchPosition - nextCharacterIndex;
				const haveSpace = requiredLength <= remainingLength;
				if (!haveSpace) {
					nextIndexes[i] = MAX_UINT16;
					continue;
				}
				if (matchedIndex.has(nextCharacterIndex)) {
					nextIndexes[i] = nextCharacterIndex;
					haveNext = true;
				} else
					nextIndexes[i] = MAX_UINT16;
			}
			return build
				? this.walkCharacterIndexes[0].filter((_, i) => i < this.walkCharacterLength && nextIndexes[i] !== MAX_UINT16)
				: haveNext;
		}
	}

	findSubstring(): number[] {
		const permutations = new Permutations(
			this.currentWordIndexes,
			this.check.bind(this),
			(aIndex, bIndex) => {
				const newLeft = this.matchedIndexes[this.currentWordIndexes[bIndex]];
				const newRight = this.matchedIndexes[this.currentWordIndexes[aIndex]];
				const canSwap =  newLeft.hasAfterSet(newRight);
				return canSwap;
			},
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