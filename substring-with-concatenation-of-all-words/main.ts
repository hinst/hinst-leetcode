class Permutations {
	constructor(sequence: Uint16Array) {
		this.sequence = sequence;
		this.sequenceLength = sequence.length;
	}

	public readonly sequence: Uint16Array;
	public checkResponse: (index: number) => boolean = () => true;
	public postResponse: () => void = () => {};
	private readonly sequenceLength: number;

	private shouldSwap(start: number, curr: number) {
		for (let i = start; i < curr; ++i)
			if (this.sequence[i] == this.sequence[curr])
				return false
		return true
	}

	findPerms(index: number) {
		if (index >= this.sequenceLength) {
			this.postResponse();
			return;
		}
		for (let i = index; i < this.sequenceLength; ++i) {
			const check = this.shouldSwap(index, i);
			if (check) {
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

	private check(limit: number): boolean {
		const firstIndex = this.currentIndexes[0];
		const matchedIndex = this.matchedIndexes[firstIndex];
		for (const characterIndex of matchedIndex) {
			if (limit === 1)
				return true;
			else {
				let sumCharacterIndex = characterIndex;
				const lastIndex = limit;
				for (let i = 1; i < limit; ++i) {
					const currentIndex = this.currentIndexes[i];
					const matchedIndex = this.matchedIndexes[currentIndex];
					const offset = this.words[currentIndex].length;
					sumCharacterIndex += offset;
					if (!matchedIndex.has(sumCharacterIndex))
						break;
					if (i === lastIndex)
						return true;
				}
			}
		}
		return false;
	}

	findSubstring(): number[] {
		const permutations = new Permutations(this.currentIndexes);
		permutations.checkResponse = this.check.bind(this);
		permutations.postResponse = () => this.results.add(this.currentIndexes);
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

	s = "barfoothefoobarman"; words = ["foo","bar"];
	console.log(findSubstring(s, words));
	console.warn('---');
}
main();