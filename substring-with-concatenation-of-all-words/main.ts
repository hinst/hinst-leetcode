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
		this.currentIndexes = new Uint16Array(words.length);
		for (let i = 0; i < words.length; ++i)
			this.currentIndexes[i] = words.indexOf(words[i]);
	}
	private readonly words: string[];
	private readonly results = new Set<number>();
	private readonly matchedIndexes: Set<number>[];
	private readonly currentIndexes: Uint16Array;

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
		const firstIndex = this.currentIndexes[0];
		const matchedIndex = this.matchedIndexes[firstIndex];
		const results: number[] = [];
		for (const characterIndex of matchedIndex) {
			if (limit === 1)
				results.push(characterIndex);
			else {
				let sumCharacterIndex = characterIndex;
				const lastIndex = limit - 1;
				for (let i = 1; i < limit; ++i) {
					const currentIndex = this.currentIndexes[i];
					const matchedIndex = this.matchedIndexes[currentIndex];
					const offset = this.words[currentIndex].length;
					sumCharacterIndex += offset;
					if (!matchedIndex.has(sumCharacterIndex))
						break;
					if (i === lastIndex)
						results.push(characterIndex);
				}
			}
		}
		if (false)
		console.log(
			' '.repeat(limit),
			limit,
			Array.from(this.currentIndexes)
				.map((currentIndex, i) => i < limit ? this.words[currentIndex] : '_')
				.join(''),
			results
		);
		return results;
	}

	findSubstring(): number[] {
		const permutations = new Permutations(
			this.currentIndexes,
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
	console.log('ANSWER', findSubstring(s, words), '---------');
}
main();