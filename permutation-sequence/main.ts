function compareNumbers(a: number, b: number) {
	return a - b;
}

class Permutations {
	constructor(
		public array: Uint8Array,
		public readonly limit: number,
	) {
		this.availableItems = new Set(array);
	}

	private counter: number = 0;
	private availableItems: Set<number>;

	next(depth: number) {
		if (depth === this.array.length) {
			++this.counter;
			console.log(this.counter, this.array.join(''));
			return;
		}
		const candidates = Array.from(this.availableItems).sort(compareNumbers);
		for (const candidate of candidates) {
			this.array[depth] = candidate;
			this.availableItems.delete(candidate);
			this.next(depth + 1);
			if (this.limit <= this.counter)
				return;
			this.availableItems.add(candidate);
		}
	}
}

function getPermutation(n: number, k: number): string {
	const array = new Uint8Array(n);
	for (let i = 0; i < n; ++i)
		array[i] = i + 1;
	const permutations = new Permutations(array, k);
	permutations.next(0);
	return permutations.array.join('');
}

if (import.meta.main) {
	console.log(getPermutation(3, 5));
}
