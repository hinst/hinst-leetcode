const MAX_UINT16 = 65535;
type QuickSet = Set<number> | number | undefined;

function quickSetHas(set: QuickSet, item: number): boolean {
	if (set === undefined)
		return false;
	return typeof set === 'number' ? set === item : set.has(item);
}

/** Check whether set contains any value equal or greater than borderValue */
function quickSetHasAfterValue(set: QuickSet, borderValue: number): boolean {
	if (set === undefined)
		return false;
	else if (typeof set === 'number')
		return borderValue <= set;
	for (const item of set)
		if (borderValue <= item)
			return true;
	return false;
}

/** Check whether bSet has any value equal or greater than any value from aSet */
function quickSetHasAfter(aSet: QuickSet, bSet: QuickSet): boolean {
	if (aSet === undefined)
		return false;
	else if (bSet === undefined)
		return false;
	else if (typeof aSet === 'number' && typeof bSet === 'number')
		return aSet <= bSet;
	else if (typeof aSet === 'number')
		return quickSetHasAfterValue(bSet, aSet);
	else if (typeof bSet === 'number') {
		for (const aItem of aSet) {
			if (aItem <= bSet)
				return true;
		}
	} else for (const aItem of aSet)
		for (const bItem of bSet)
			if (aItem <= bItem)
				return true;
	return false;
}

function quickSetAdd(set: QuickSet | undefined, item: number): QuickSet {
	if (set === undefined)
		return item;
	if (typeof set === 'number')
		set = new Set<number>([set]);
	set.add(item);
	return set;
}

function getQuickSetLength(set: QuickSet): number {
	return set === undefined
		? 0
		: typeof set === 'number'
			? 1
			: set.size;
}

function quickSetCopy(array: Uint16Array, set: QuickSet): number {
	if (set === undefined)
		return 0;
	else if (typeof set === 'number') {
		array[0] = set;
		return 1;
	} else {
		let index = 0;
		set.forEach(item => {
			array[index] = item;
			++index;
		});
		return set.size;
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
		private readonly s: string,
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
	private readonly matchMap = new Map<number, number>();
	private readonly currentWordIndexes: Uint16Array;
	private readonly walkCharacterIndexes: Uint16Array[];
	private walkCharacterLength: number = 0;
	private minWordLength: number = Number.MAX_SAFE_INTEGER;
	private maxMatchPosition: number = 0;
	private maxMultiMatch: number = Number.MIN_SAFE_INTEGER;

	private createMatchedIndexes(s: string, wordArray: string[]): QuickSet[] {
		const matchSet = new Array<QuickSet>(...wordArray.map((word, wordIndex) => {
			let indexes: QuickSet | undefined = undefined;
			for (
				let textIndex = s.indexOf(word);
				textIndex !== -1;
				textIndex = s.indexOf(word, textIndex + 1)
			) {
				indexes = quickSetAdd(indexes, textIndex);
				const textEndIndex = textIndex + word.length;
				if (this.maxMatchPosition < textEndIndex)
					this.maxMatchPosition = textEndIndex;
				this.matchMap.set(wordIndex, textIndex);
			}
			if (word.length < this.minWordLength)
				this.minWordLength = word.length;
			if (this.maxMultiMatch < getQuickSetLength(indexes))
				this.maxMultiMatch = getQuickSetLength(indexes);
			return indexes;
		}));
		return matchSet;
	}

	private check(limit: number, build: boolean): boolean | Uint16Array {
		const before = limit - 2;
		const current = limit - 1;
		const currentWordIndex = this.currentWordIndexes[current];
		const matchedIndex = this.matchedIndexes[currentWordIndex];
		if (limit === 1) {
			this.walkCharacterLength = quickSetCopy(this.walkCharacterIndexes[0], matchedIndex);
			if (false)
				console.log(
					' '.repeat(limit),
					limit,
					Array.from(this.currentWordIndexes)
						.map((currentIndex, i) => i < limit ? this.words[currentIndex] : '_')
						.join(''),
					Array.from(this.walkCharacterIndexes[0]).map((index, i) => this.walkCharacterIndexes[limit - 1][i] !== MAX_UINT16 ? index : '_').join(),
				);
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
				// let haveRemainingWords = true;
				// for (let i = limit; i < this.currentWordIndexes.length; ++i) {
				// 	const futureIndex = this.currentWordIndexes[i];
				// 	if (!quickSetHasAfterValue(this.matchedIndexes[futureIndex], nextCharacterIndex)) {
				// 		haveRemainingWords = false;
				// 		break;
				// 	}
				// }
				// if (!haveRemainingWords) {
				// 	nextIndexes[i] = MAX_UINT16;
				// 	continue;
				// }
				if (quickSetHas(matchedIndex, nextCharacterIndex)) {
					nextIndexes[i] = nextCharacterIndex;
					haveNext = true;
				} else
					nextIndexes[i] = MAX_UINT16;
			}
			if (false)
				console.log(
					' '.repeat(limit),
					limit,
					Array.from(this.currentWordIndexes)
						.map((currentIndex, i) => i < limit ? this.words[currentIndex] : '_')
						.join(''),
					Array.from(this.walkCharacterIndexes[0]).map((index, i) => this.walkCharacterIndexes[limit - 1][i] !== MAX_UINT16 ? index : '_').join(),
				);
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
				const canSwap =  quickSetHasAfter(newLeft, newRight);
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