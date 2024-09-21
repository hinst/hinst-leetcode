/**Source: https://en.wikipedia.org/wiki/Heap%27s_algorithm */
class Permutator {
	constructor(
		private A: Uint16Array,
		private output: () => void,
	) {
	}

	generate(k: number) {
		if (k === 1)
			this.output();
		else {
			// Generate permutations with k-th unaltered
			// Initially k = length(A)
			this.generate(k - 1)

			// Generate permutations for k-th swapped with each k-1 initial
			for (let i = 0; i < k-1; i += 1) {
				// Swap choice dependent on parity of k (even or odd)
				if (k % 2 === 0)
					this.swap(i, k-1); // zero-indexed, the k-th is at k-1
				else
					this.swap(0, k-1);
				this.generate(k - 1)
			}
		}
	}

	private swap(a: number, b: number) {
		const buffer = this.A[a];
		this.A[a] = this.A[b];
		this.A[b] = buffer;
	}
}

class App {
	constructor(s: string, private words: string[]) {
		this.matchedIndexes = App.createMatchedIndexes(s, words);
		this.currentIndexes = new Uint16Array(this.words.map((_, index) => index));
	}
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

	private check() {
		const firstIndex = this.currentIndexes[0];
		const matchedIndex = this.matchedIndexes[firstIndex];
		for (const characterIndex of matchedIndex) {
			if (this.currentIndexes.length === 1)
				this.results.add(characterIndex)
			else {
				let sumCharacterIndex = characterIndex;
				for (let i = 1; i < this.currentIndexes.length; ++i) {
					const currentIndex = this.currentIndexes[i];
					const matchedIndex = this.matchedIndexes[currentIndex];
					const offest = this.words[currentIndex].length;
					sumCharacterIndex += offest;
					if (!matchedIndex.has(sumCharacterIndex))
						break;
					if (i === this.currentIndexes.length - 1) {
						this.results.add(characterIndex);
					}
				}
			}
		}
	}

	findSubstring(): number[] {
		for (const matchedIndex of this.matchedIndexes)
			if (!matchedIndex.size)
				return [];
		const permutator = new Permutator(this.currentIndexes, this.check.bind(this));
		permutator.generate(this.words.length);
		return Array.from(this.results);
	}
}

function findSubstring(s: string, words: string[]): number[] {
	if (s === words.join(''))
		return [0];
	return new App(s, words).findSubstring();
}

function main() {
	let s: string;
	let words: string[];

	s = "mississippi"; words = ["is"];
	console.log(findSubstring(s, words));
	console.warn('---');
}
main();